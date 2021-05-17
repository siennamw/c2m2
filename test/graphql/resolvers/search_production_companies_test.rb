require 'test_helper'

class Resolvers::SearchProductionCompaniesTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::SearchProductionCompanies.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    )

    @production_companies = []
    6.times do |n|
      @production_companies << ProductionCompany.create!(
        created_by: @cataloger,
        name: "name#{n}",
      )
    end

    @deleted_production_companies = []
    2.times do |n|
      @deleted_production_companies << ProductionCompany.create!(
        created_by: @cataloger,
        name: "deleted#{n}",
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

    assert_equal [@production_companies[1], @production_companies[2], @production_companies[3], @production_companies[4]].map(&:id).sort, result.map(&:id).sort
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

    assert_equal [@production_companies[1], @production_companies[2], @production_companies[3], @production_companies[4]].map(&:id).sort, result.map(&:id).sort
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
    assert_equal [@production_companies[0], @production_companies[1]].map(&:id).sort, result.map(&:id).sort
  end

  test 'skip (offset) determines number of items skipped for pagination' do
    skip = 3

    result = find(
      filter: {
        'name_contains' => 'NAME',
      },
      skip: skip,
    )

    assert_equal [@production_companies[3], @production_companies[4], @production_companies[5]].map(&:id).sort, result.map(&:id).sort
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
    assert_equal [@production_companies[2], @production_companies[3], @production_companies[4]].map(&:id).sort, result.map(&:id).sort
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

    assert_equal @production_companies.map(&:id).reverse, result.map(&:id)
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

    assert_equal @production_companies.reverse[skip, first].map(&:id), result.map(&:id)
  end

  test 'deleted records included for authenticated user when include_deleted arg is true' do
    result = find(
      { include_deleted: true },
      @cataloger
    )

    expected = @production_companies.map(&:id).concat(@deleted_production_companies.map(&:id)).sort
    assert_equal expected, result.map(&:id).sort
  end

  test 'deleted records not included for unauthenticated user even if include_deleted arg is true' do
    result = find(include_deleted: true)
    assert_equal @production_companies.map(&:id).sort, result.map(&:id).sort
  end
end
