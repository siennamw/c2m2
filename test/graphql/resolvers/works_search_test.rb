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
      cataloger: @cataloger
    )
    @material_format = MaterialFormat.create!(
      name: 'a material format',
      cataloger: @cataloger
    )
  end

  test 'filter option' do
    works = []
    4.times do |n|
      works << Work.create!(
        cataloger: @cataloger,
        title: "title#{n}",
        secondary_title: "secondary#{n}",
        alias_alternates: "alias#{n}",
        year: 2018,
        media_type: @media_type,
        material_format: @material_format,
      )
    end

    result = find(
      filter: {
        'include_drafts' => true,
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
        cataloger: @cataloger,
        title: "TITLE#{n}",
        secondary_title: "Secondary#{n}",
        alias_alternates: "aLiAs#{n}",
        year: 2018,
        media_type: @media_type,
        material_format: @material_format,
      )
    end

    result = find(
      filter: {
        'include_drafts' => true,
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

  test 'filter out drafts by default' do
    works = []
    4.times do |n|
      works << Work.create!(
        cataloger: @cataloger,
        title: "TITLE#{n}",
        secondary_title: "Secondary#{n}",
        alias_alternates: "aLiAs#{n}",
        year: 2018,
        media_type: @media_type,
        material_format: @material_format,
      )
    end

    2.times do |n|
      w = Work.create!(
        cataloger: @cataloger,
        title: "TITLE#{n}",
        secondary_title: "Secondary#{n}",
        alias_alternates: "aLiAs#{n}",
        year: 2018,
        media_type: @media_type,
        material_format: @material_format,
      )

      w.update(
       publication_status: 'provisional'
      )

      works << w
    end

    result = find(
      filter: {}
    )

    assert_equal [works[4], works[5]].map(&:id).sort, result.map(&:id).sort
  end

  test 'include all publication statuses when include_drafts filter is passed' do
    works = []
    2.times do |n|
      works << Work.create!(
        cataloger: @cataloger,
        title: "TITLE#{n}",
        secondary_title: "Secondary#{n}",
        alias_alternates: "aLiAs#{n}",
        year: 2018,
        media_type: @media_type,
        material_format: @material_format,
      )
    end

    2.times do |n|
      w = Work.create!(
        cataloger: @cataloger,
        title: "TITLE#{n}",
        secondary_title: "Secondary#{n}",
        alias_alternates: "aLiAs#{n}",
        year: 2018,
        media_type: @media_type,
        material_format: @material_format,
      )

      w.update(
        publication_status: 'provisional'
      )

      works << w
    end

    result = find(
      filter: {
        'include_drafts' => true,
      }
    )

    assert_equal works.map(&:id).sort, result.map(&:id).sort
  end

  test 'search and drafts filter work together' do
    works = []
    4.times do |n|
      works << Work.create!(
        cataloger: @cataloger,
        title: "TITLE#{n}",
        secondary_title: "Secondary#{n}",
        alias_alternates: "aLiAs#{n}",
        year: 2018,
        media_type: @media_type,
        material_format: @material_format,
      )
    end

    2.times do |n|
      w = Work.create!(
        cataloger: @cataloger,
        title: "TITLE#{n}",
        secondary_title: "Secondary#{n}",
        alias_alternates: "aLiAs#{n}",
        year: 2018,
        media_type: @media_type,
        material_format: @material_format,
      )

      w.update(
        publication_status: 'provisional'
      )

      works << w
    end

    result = find(
      filter: {
        'title_contains' => 'title1',
      }
    )

    assert_equal [works[5]].map(&:id).sort, result.map(&:id).sort
  end
end
