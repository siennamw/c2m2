require 'test_helper'

class Resolvers::SearchRepositoriesTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::SearchRepositories.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    )

    @repositories = []
    6.times do |n|
      @repositories << Repository.create!(
        created_by: @cataloger,
        name: "name#{n}",
        location: "location#{n}",
      )
    end

    @deleted_repositories = []
    2.times do |n|
      @deleted_repositories << Repository.create!(
        created_by: @cataloger,
        name: "deleted#{n}",
        location: "location#{n}",
        deleted: true,
      )
    end
  end

  test 'filter option' do
    result = find(
      filter: {
        'name_contains' => 'name1',
        'OR' => [
          {
            'name_contains' => 'name2',
            'OR' => [{ 'name_contains' => 'name3' }]
          },
          { 'name_contains' => 'name4' },
        ],
      },
    )

    assert_equal [@repositories[1], @repositories[2], @repositories[3], @repositories[4]].map(&:id).sort, result.map(&:id).sort
  end

  test 'filter option is case insensitive' do
    result = find(
      filter: {
        'name_contains' => 'NAME1',
        'OR' => [
          {
            'name_contains' => 'nAmE2',
            'OR' => [{ 'name_contains' => 'Name3' }]
          },
          { 'name_contains' => 'NaMe4' },
        ],
      },
    )

    assert_equal [@repositories[1], @repositories[2], @repositories[3], @repositories[4]].map(&:id).sort, result.map(&:id).sort
  end

  test 'first (limit) determines number of items returned' do
    first = 2

    result = find(
      filter: {
        'name_contains' => 'NAME',
      },
      first: first,
    )

    assert_equal result.length, first
    assert_equal [@repositories[0], @repositories[1]].map(&:id).sort, result.map(&:id).sort
  end

  test 'skip (offset) determines number of items skipped for pagination' do
    skip = 3

    result = find(
      filter: {
        'name_contains' => 'NAME',
      },
      skip: skip,
    )

    assert_equal [@repositories[3], @repositories[4], @repositories[5]].map(&:id).sort, result.map(&:id).sort
  end

  test 'skip and limit work together as expected' do
    first = 3
    skip = 2

    result = find(
      filter: {
        'name_contains' => 'NAME',
      },
      first: first,
      skip: skip,
    )

    assert_equal result.length, first
    assert_equal [@repositories[2], @repositories[3], @repositories[4]].map(&:id).sort, result.map(&:id).sort
  end

  test 'sorting attributes work as expected' do
    field = 'name'
    is_ascending = false

    result = find(
      sorting: {
        'field' => field,
        'is_ascending' => is_ascending,
      },
    )

    assert_equal @repositories.map(&:id).reverse, result.map(&:id)
  end

  test 'sorting, skip, and limit work together as expected' do
    field = 'name'
    is_ascending = false
    first = 3
    skip = 2

    result = find(
      sorting: {
        'field' => field,
        'is_ascending' => is_ascending,
      },
      first: first,
      skip: skip,
    )

    assert_equal @repositories.reverse[skip, first].map(&:id), result.map(&:id)
  end

  test 'deleted records included for authenticated user when include_deleted arg is true' do
    result = find(
      { include_deleted: true },
      @cataloger
    )

    expected = @repositories.map(&:id).concat(@deleted_repositories.map(&:id)).sort
    assert_equal expected, result.map(&:id).sort
  end

  test 'deleted records not included for unauthenticated user even if include_deleted arg is true' do
    result = find(include_deleted: true)
    assert_equal @repositories.map(&:id).sort, result.map(&:id).sort
  end
end
