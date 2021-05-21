require 'test_helper'

class Resolvers::SearchDirectorsTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::SearchDirectors.call(nil, args, { current_user: current_user })
  end

  def default_sort(items)
    items.sort { |a, b| a.name <=> b.name }
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    )

    @directors = []
    6.times do |n|
      @directors << Director.create!(
        created_by: @cataloger,
        name: "name#{n}",
      )
    end

    @deleted_directors = []
    2.times do |n|
      @deleted_directors << Director.create!(
        created_by: @cataloger,
        name: "deleted#{n}",
        deleted: true,
      )
    end

    @directors = default_sort(@directors)
    @deleted_directors = default_sort(@deleted_directors)
  end

  test 'no arguments returns undeleted records in ascending order by name' do
    result = find()
    assert_equal @directors.map(&:id), result.map(&:id)
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

    assert_equal [@directors[1], @directors[2], @directors[3], @directors[4]].map(&:id), result.map(&:id)
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

    assert_equal [@directors[1], @directors[2], @directors[3], @directors[4]].map(&:id), result.map(&:id)
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
    assert_equal [@directors[0], @directors[1]].map(&:id), result.map(&:id)
  end

  test 'skip (offset) determines number of items skipped for pagination' do
    skip = 3

    result = find(
      filter: {
        'name_contains' => 'NAME',
      },
      skip: skip,
    )

    assert_equal [@directors[3], @directors[4], @directors[5]].map(&:id), result.map(&:id)
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
    assert_equal [@directors[2], @directors[3], @directors[4]].map(&:id), result.map(&:id)
  end

  test 'sorting attributes work as expected' do
    field = 'id'
    is_ascending = false

    result = find(
      sorting: {
        'field' => field,
        'is_ascending' => is_ascending,
      },
    )

    assert_equal @directors.map(&:id).sort.reverse, result.map(&:id)
  end

  test 'sorting, skip, and limit work together as expected' do
    field = 'id'
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

    assert_equal @directors.map(&:id).sort.reverse[skip, first], result.map(&:id)
  end

  test 'deleted records included for authenticated user when include_deleted arg is true' do
    result = find(
      { include_deleted: true },
      @cataloger
    )

    expected = default_sort([@directors, @deleted_directors].flatten).map(&:id)
    assert_equal expected, result.map(&:id)
  end

  test 'deleted records not included for unauthenticated user even if include_deleted arg is true' do
    result = find(include_deleted: true)
    assert_equal @directors.map(&:id), result.map(&:id)
  end
end
