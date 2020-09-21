require 'test_helper'

class Resolvers::SearchCollectionsTest < ActiveSupport::TestCase
  def find(args)
    Resolvers::SearchCollections.call(nil, args, nil)
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    )
    @repository = Repository.create!(
      name: 'a repository',
      location: 'Boulder, CO',
      created_by: @cataloger,
    )
    @collections = []
    6.times do |n|
      @collections << Collection.create!(
        created_by: @cataloger,
        name: "name#{n}",
        repository: @repository,
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
            'OR' => [{ 'name_contains' => 'name3' }],
          },
          { 'name_contains' => 'name4' },
        ],
      },
    )

    assert_equal [@collections[1], @collections[2], @collections[3], @collections[4]].map(&:id).sort, result.map(&:id).sort
  end

  test 'filter option is case insensitive' do
    result = find(
      filter: {
        'name_contains' => 'NAME1',
        'OR' => [
          {
            'name_contains' => 'nAmE2',
            'OR' => [{ 'name_contains' => 'Name3' }],
          },
          { 'name_contains' => 'NaMe4' },
        ],
      },
    )

    assert_equal [@collections[1], @collections[2], @collections[3], @collections[4]].map(&:id).sort, result.map(&:id).sort
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
    assert_equal [@collections[0], @collections[1]].map(&:id).sort, result.map(&:id).sort
  end

  test 'skip (offset) determines number of items skipped for pagination' do
    skip = 3

    result = find(
      filter: {
        'name_contains' => 'NAME',
      },
      skip: skip,
    )

    assert_equal [@collections[3], @collections[4], @collections[5]].map(&:id).sort, result.map(&:id).sort
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
    assert_equal [@collections[2], @collections[3], @collections[4]].map(&:id).sort, result.map(&:id).sort
  end
end
