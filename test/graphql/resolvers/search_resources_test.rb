require 'test_helper'

class Resolvers::SearchResourcesTest < ActiveSupport::TestCase
  def find(args)
    Resolvers::SearchResources.call(nil, args, nil)
  end

  setup do
    @cataloger = Cataloger.create!(admin: true, name: 'test', email: 'test@email.com', password: 'test_test')

    media_type = MediaType.create!(name: 'a media type', created_by: @cataloger)
    @work = Work.create!(title: 'a film', media_type: media_type, year: 1990, created_by: @cataloger)

    @material_formats = []
    @resources = []

    6.times do |n|
      @material_formats << MaterialFormat.create!(
        name: "material format #{n}",
        created_by: @cataloger,
      )

      @resources << Resource.create!(
        created_by: @cataloger,
        work: @work,
        material_format: @material_formats[n],
        publication_status: %w(draft provisional approved).sample
      )
    end
  end

  test 'first (limit) determines number of items returned' do
    first = 2

    result = find(
      first: first,
    )

    assert_equal result.length, first
    assert_equal [@resources[0], @resources[1]].map(&:id).sort, result.map(&:id).sort
  end

  test 'skip (offset) determines number of items skipped for pagination' do
    skip = 3

    result = find(
      skip: skip,
    )

    assert_equal [@resources[3], @resources[4], @resources[5]].map(&:id).sort, result.map(&:id).sort
  end

  test 'skip and limit work together as expected' do
    first = 3
    skip = 2

    result = find(
      first: first,
      skip: skip,
    )

    assert_equal result.length, first
    assert_equal [@resources[2], @resources[3], @resources[4]].map(&:id).sort, result.map(&:id).sort
  end

  test 'sorting attributes work as expected' do
    field = 'publication_status'
    is_ascending = false

    result = find(
      sorting: {
        'field' => field,
        'is_ascending' => is_ascending,
      },
    )

    assert_equal @resources.map(&:publication_status).sort.reverse, result.map(&:publication_status)
  end
end