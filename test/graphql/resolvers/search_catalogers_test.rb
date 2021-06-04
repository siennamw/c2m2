require 'test_helper'

class Resolvers::SearchCatalogersTest < ActiveSupport::TestCase
  def find(args = {}, current_user = @catalogers[0])
    Resolvers::SearchCatalogers.call(nil, args, { current_user: current_user })
  end

  def default_sort(items)
    items.sort { |a, b| a.name <=> b.name }
  end

  setup do
    @catalogers = []
    6.times do |n|
      @catalogers << Cataloger.create!(
        name: "name#{n}",
        email: "test#{n}@example.com",
      )
    end

    @catalogers = default_sort(@catalogers)
  end

  test 'no arguments returns all records in ascending order by name' do
    result = find()
    assert_equal @catalogers.map(&:id), result.map(&:id)
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

    assert_equal [@catalogers[1], @catalogers[2], @catalogers[3], @catalogers[4]].map(&:id), result.map(&:id)
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

    assert_equal [@catalogers[1], @catalogers[2], @catalogers[3], @catalogers[4]].map(&:id), result.map(&:id)
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
    assert_equal [@catalogers[0], @catalogers[1]].map(&:id), result.map(&:id)
  end

  test 'skip (offset) determines number of items skipped for pagination' do
    skip = 3

    result = find(
      filter: {
        'name_contains' => 'NAME',
      },
      skip: skip,
    )

    assert_equal [@catalogers[3], @catalogers[4], @catalogers[5]].map(&:id), result.map(&:id)
  end

  test 'skip and limit work together as expected' do
    first = 3
    skip = 2

    result = find(
      first: first,
      skip: skip,
    )

    assert_equal result.length, first
    assert_equal [@catalogers[2], @catalogers[3], @catalogers[4]].map(&:id), result.map(&:id)
  end

  test 'sorting attributes work as expected' do
    field = 'email'
    is_ascending = false

    result = find(
      sorting: {
        'field' => field,
        'is_ascending' => is_ascending,
      },
    )

    assert_equal @catalogers.map(&:email).sort.reverse, result.map(&:email)
  end

  test 'sorting, skip, and limit work together as expected' do
    field = 'email'
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

    assert_equal @catalogers.map(&:email).sort.reverse[skip, first], result.map(&:email)
  end

  test 'raises an error if called by unauthenticated user' do
    assert_raises GraphQL::ExecutionError do
      find({}, nil)
    end
  end
end
