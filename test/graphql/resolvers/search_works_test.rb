require 'test_helper'

class Resolvers::SearchWorksTest < ActiveSupport::TestCase
  def find(args)
    Resolvers::SearchWorks.call(nil, args, nil)
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
    4.times do |n|
      @works << Work.create!(
        created_by: @cataloger,
        title: "title#{n}",
        secondary_title: "secondary#{n}",
        alias_alternates: "alias#{n}",
        year: 2018,
        media_type: @media_type,
      )
    end
  end

  test 'filter option' do
    result = find(
      filter: {
        'title_contains' => 'title1',
        'OR' => [
          {
            'secondary_title_contains' => 'secondary2',
            'OR' => [{ 'alias_alternates_contains' => 'alias3' }]
          },
          { 'title_contains' => 'title2' }
        ]
      }
    )

    assert_equal [@works[1], @works[2], @works[3]].map(&:id).sort, result.map(&:id).sort
  end

  test 'filter option is case insensitive' do
    result = find(
      filter: {
        'title_contains' => 'title1',
        'OR' => [
          {
            'secondary_title_contains' => 'secondary2',
            'OR' => [{ 'alias_alternates_contains' => 'alias3' }]
          },
          { 'title_contains' => 'title2' }
        ]
      }
    )

    assert_equal [@works[1], @works[2], @works[3]].map(&:id).sort, result.map(&:id).sort
  end

  test 'first (limit) determines number of items returned' do
    first = 2

    result = find(
      filter: {
        'title_contains' => 'title',
      },
      first: first
    )

    assert_equal result.length, first
    assert_equal [@works[0], @works[1]].map(&:id).sort, result.map(&:id).sort
  end

  test 'skip (offset) determines number of items skipped for pagination' do
    skip = 1

    result = find(
      filter: {
        'title_contains' => 'title',
      },
      skip: skip,
    )

    assert_equal [@works[1], @works[2], @works[3]].map(&:id).sort, result.map(&:id).sort
  end

  test 'skip and limit work together as expected' do
    first = 2
    skip = 1

    result = find(
      filter: {
        'title_contains' => 'title',
      },
      first: first,
      skip: skip
    )

    assert_equal result.length, first
    assert_equal [@works[1], @works[2]].map(&:id).sort, result.map(&:id).sort
  end
end