require 'test_helper'

class Resolvers::SearchWorksTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::SearchWorks.call(nil, args, { current_user: current_user })
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
  end

  test 'no filter (expecting all)' do
    result = find(
      filter: {}
    )

    assert result.length, @count
    assert_equal [@works, @works_minimum].flatten.map(&:id).sort, result.map(&:id).sort
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
    assert_equal @works.map(&:id).sort, result.map(&:id).sort
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
    assert_equal [@works[3]].map(&:id).sort, result.map(&:id).sort
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
    assert_equal [@works[1], @works[2], @works[3], @works[4]].map(&:id).sort, result.map(&:id).sort
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
    assert_equal [@works[1], @works[2], @works[3]].map(&:id).sort, result.map(&:id).sort
  end

  test 'date range parameters select works within the range defined' do
    result = find(
      filter: {
        'dateRangeEnd' => 2003,
        'dateRangeStart' => 2001,
      }
    )

    assert result.length, 3
    assert_equal [@works[1], @works[2], @works[3]].map(&:id).sort, result.map(&:id).sort
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
    assert_equal [@works[1], @works[2], @works[3]].map(&:id).sort, result.map(&:id).sort
  end

  test 'first (limit) determines number of items returned' do
    first = 2

    result = find(
      filter: {
        'title' => 'title',
      },
    )

    result_with_first = find(
      filter: {
        'title' => 'title',
      },
      first: first,
    )

    assert result_with_first.length, first
    assert_equal result_with_first.map(&:id), result.map(&:id).take(first)
  end

  test 'skip (offset) determines number of items skipped for pagination' do
    skip = 1

    result = find(
      filter: {
        'title' => 'title',
      },
    )

    result_with_skip = find(
      filter: {
        'title' => 'title',
      },
      skip: skip,
    )

    assert result_with_skip.length, @count - skip
    assert_equal result_with_skip.map(&:id), result.map(&:id).drop(skip)
  end

  test 'skip and limit work together as expected' do
    first = 2
    skip = 1

    result = find(
      filter: {
        'title' => 'title',
      },
    )

    result_with_skip_and_limit = find(
      filter: {
        'title' => 'title',
      },
      first: first,
      skip: skip
    )

    assert_equal result_with_skip_and_limit.length, first
    assert_equal result_with_skip_and_limit.map(&:id), result.map(&:id).drop(skip).take(first)
  end

  test 'sorting attributes work as expected' do
    field = 'title'
    is_ascending = false

    result = find(
      sorting: {
        'field' => field,
        'is_ascending' => is_ascending,
      },
    )

    assert_equal @works_minimum.concat(@works).map(&:id).reverse, result.map(&:id)
  end

  test 'sorting, skip, and limit work together as expected' do
    field = 'title'
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

    assert_equal @works.reverse[skip, first].map(&:id), result.map(&:id)
  end

  test 'deleted records included for authenticated user when include_deleted arg is true' do
    result = find(
      { include_deleted: true },
      @cataloger
    )

    assert_equal @works_minimum.concat(@works).concat(@deleted_works).map(&:id).sort, result.map(&:id).sort
  end

  test 'deleted records not included for unauthenticated user even if include_deleted arg is true' do
    result = find(include_deleted: true)
    assert_equal @works_minimum.concat(@works).map(&:id).sort, result.map(&:id).sort
  end
end
