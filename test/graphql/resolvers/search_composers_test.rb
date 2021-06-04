require 'test_helper'

class Resolvers::SearchComposersTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::SearchComposers.call(nil, args, { current_user: current_user })
  end

  def default_sort(items)
    items.sort { |a, b| a.name <=> b.name }
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )

    @composers = []
    6.times do |n|
      @composers << Composer.create!(
        created_by: @cataloger,
        name: "name#{n}",
      )
    end

    @composers = default_sort(@composers)
  end

  test 'no arguments returns all records in ascending order by name' do
    result = find()
    assert_equal @composers.map(&:id), result.map(&:id)
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

    assert_equal [@composers[1], @composers[2], @composers[3], @composers[4]].map(&:id), result.map(&:id)
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

    assert_equal [@composers[1], @composers[2], @composers[3], @composers[4]].map(&:id), result.map(&:id)
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
    assert_equal [@composers[0], @composers[1]].map(&:id), result.map(&:id)
  end

  test 'skip (offset) determines number of items skipped for pagination' do
    skip = 3

    result = find(
      filter: {
        'name_contains' => 'NAME',
      },
      skip: skip,
    )

    assert_equal [@composers[3], @composers[4], @composers[5]].map(&:id), result.map(&:id)
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
    assert_equal [@composers[2], @composers[3], @composers[4]].map(&:id), result.map(&:id)
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

    assert_equal @composers.map(&:id).sort.reverse, result.map(&:id)
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

    assert_equal @composers.map(&:id).sort.reverse[skip, first], result.map(&:id)
  end
end
