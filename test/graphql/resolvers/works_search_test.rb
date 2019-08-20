require 'test_helper'

class Resolvers::WorksSearchTest < ActiveSupport::TestCase
  def find(args)
    Resolvers::WorksSearch.call(nil, args, nil)
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
  end

  test 'filter option' do
    works = []
    4.times do |n|
      works << Work.create!(
        created_by: @cataloger,
        title: "title#{n}",
        secondary_title: "secondary#{n}",
        alias_alternates: "alias#{n}",
        year: 2018,
        media_type: @media_type,
      )
    end

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

    assert_equal [works[1], works[2], works[3]].map(&:id).sort, result.map(&:id).sort
  end

  test 'filter option is case insensitive' do
    works = []
    4.times do |n|
      works << Work.create!(
        created_by: @cataloger,
        title: "TITLE#{n}",
        secondary_title: "Secondary#{n}",
        alias_alternates: "aLiAs#{n}",
        year: 2018,
        media_type: @media_type,
      )
    end

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

    assert_equal [works[1], works[2], works[3]].map(&:id).sort, result.map(&:id).sort
  end
end
