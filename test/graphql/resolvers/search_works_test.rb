require 'test_helper'

class Resolvers::SearchWorksTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::SearchWorks.call(nil, args, { current_user: current_user })
  end

  def default_sort(items)
    items.sort { |a, b| a.title <=> b.title }
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678'
    )
    @media_type = MediaType.create!(
      name: 'a media type',
      created_by: @cataloger
    )

    @works = []
    @works_minimum = []
    @deleted_works = []
    @composers = []
    @countries = []
    @directors = []
    @production_companies = []

    @count = 5

    @count.times do |n|
      @composers << Composer.create!(
        name: "composer#{n}",
        imdb_link: "example.com/composer#{n}",
        created_by: @cataloger
      )
      @countries << Country.create!(
        name: "country#{n}",
        created_by: @cataloger
      )
      @directors << Director.create!(
        name: "director#{n}",
        imdb_link: "example.com/director#{n}",
        created_by: @cataloger
      )
      @production_companies << ProductionCompany.create!(
        name: "production_company#{n}",
        contact_info: 'company.com',
        created_by: @cataloger
      )

      @works << Work.create!(
        alias_alternates: "alias#{n}",
        created_by: @cataloger,
        composers: [@composers[n]],
        directors: [@directors[n]],
        country: @countries[n],
        media_type: @media_type,
        production_companies: [@production_companies[n]],
        secondary_title: "secondary#{n}",
        title: "title#{n}",
        year: 2000 + n,
      )

      # works with minimum required fields
      @works_minimum << Work.create!(
        created_by: @cataloger,
        media_type: @media_type,
        title: "minimum#{n}",
        year: 1900 + n,
      )

      @deleted_works << Work.create!(
        created_by: @cataloger,
        media_type: @media_type,
        title: "deleted#{n}",
        year: 1950 + n,
        deleted: true,
      )
    end

    # default sort order is title ascending
    @works = default_sort(@works)
    @works_minimum = default_sort(@works_minimum)
    @deleted_works = default_sort(@deleted_works)
  end

  test 'no filter (expecting all)' do
    result = find(
      filter: {}
    )

    assert result.length, @count
    assert_equal default_sort([@works, @works_minimum].flatten).map(&:id), result.map(&:id)
  end

  test 'filter option without OR clauses (expecting all @works)' do
    result = find(
      filter: {
        'dateRangeEnd' => 2020,
        'dateRangeStart' => '2000',
        'director' => 'director',
        'title' => 'title',
      }
    )

    assert result.length, @count
    assert_equal @works.map(&:id), result.map(&:id)
  end

  test 'filter option without OR clauses (expecting one)' do
    result = find(
      filter: {
        'country' => '3',
        'director' => '3',
        'title' => '3',
      }
    )

    assert result.length, 1
    assert_equal [@works[3]].map(&:id), result.map(&:id)
  end

  test 'filter option with OR clauses' do
    result = find(
      filter: {
        'title' => 'title1',
        'OR' => [
          {
            'composer' => '2',
            'OR' => [{ 'productionCompany' => '3' }]
          },
          { 'director' => '4' }
        ]
      }
    )

    assert result.length, 4
    assert_equal [@works[1], @works[2], @works[3], @works[4]].map(&:id), result.map(&:id)
  end

  test 'title field looks at secondary title and aliases too; no duplicates in return' do
    result = find(
      filter: {
        'title' => 'title1',
        'OR' => [
          {
            'title' => 'secondary2',
            'OR' => [{ 'title' => 'alias3' }]
          },
          { 'title' => 'title2' }
        ]
      }
    )

    assert result.length, 3
    assert_equal [@works[1], @works[2], @works[3]].map(&:id), result.map(&:id)
  end

  test 'date range parameters select works within the range defined' do
    result = find(
      filter: {
        'dateRangeEnd' => 2003,
        'dateRangeStart' => 2001,
      }
    )

    assert result.length, 3
    assert_equal [@works[1], @works[2], @works[3]].map(&:id), result.map(&:id)
  end

  test 'filter option is case insensitive' do
    result = find(
      filter: {
        'title' => 'TITLE1',
        'OR' => [
          {
            'title' => 'Secondary2',
            'OR' => [{ 'title' => 'AlIAs3' }]
          },
          { 'title' => 'tITLe2' }
        ]
      }
    )

    assert result.length, 3
    assert_equal [@works[1], @works[2], @works[3]].map(&:id), result.map(&:id)
  end

  test 'first (limit) determines number of items returned' do
    first = 2

    result = find(
      first: first,
    )

    assert result.length, first
    assert_equal default_sort([@works, @works_minimum].flatten).take(first).map(&:id), result.map(&:id)
  end

  test 'skip (offset) determines number of items skipped for pagination' do
    skip = 1

    result = find(
      skip: skip,
    )

    assert result.length, @count - skip
    assert_equal default_sort([@works, @works_minimum].flatten).drop(skip).map(&:id), result.map(&:id)
  end

  test 'skip and limit work together as expected' do
    first = 2
    skip = 1

    result = find(
      first: first,
      skip: skip
    )

    assert result.length, first
    assert_equal default_sort([@works, @works_minimum].flatten)[skip, first].map(&:id), result.map(&:id)
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

    assert_equal [@works, @works_minimum].flatten.map(&:id).sort.reverse, result.map(&:id)
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

    assert_equal [@works, @works_minimum].flatten.map(&:id).sort.reverse[skip, first], result.map(&:id)
  end

  test 'deleted records included for authenticated user when include_deleted arg is true' do
    result = find(
      { include_deleted: true },
      @cataloger
    )

    assert_equal default_sort([@works, @works_minimum, @deleted_works].flatten).map(&:id), result.map(&:id)
  end

  test 'deleted records not included for unauthenticated user even if include_deleted arg is true' do
    result = find(include_deleted: true)
    assert_equal default_sort([@works, @works_minimum].flatten).map(&:id), result.map(&:id)
  end
end
