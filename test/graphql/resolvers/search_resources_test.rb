require 'test_helper'

class Resolvers::SearchResourcesTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::SearchResources.call(nil, args, { current_user: current_user })
  end
  
  def default_sort(items)
    items.sort { |a, b| b.created_at <=> a.created_at }
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

    @deleted_resources = []
    2.times do |n|
      @deleted_resources << Resource.create!(
        created_by: @cataloger,
        work: @work,
        material_format: @material_formats[n],
        publication_status: %w(draft provisional approved).sample,
        deleted: true,
      )
    end

    #  default sort order is created_at descending
    @resources = default_sort(@resources)
    @deleted_resources = default_sort(@deleted_resources)
  end

  test 'no arguments returns undeleted records in descending order by created_at' do
    result = find()
    assert_equal @resources.map(&:id), result.map(&:id)
  end

  test 'first (limit) determines number of items returned' do
    first = 2

    result = find(
      first: first,
    )

    assert_equal result.length, first
    assert_equal @resources.map(&:id).take(first), result.map(&:id)
  end

  test 'skip (offset) determines number of items skipped for pagination' do
    skip = 3

    result = find(
      skip: skip,
    )

    assert_equal @resources.map(&:id).drop(skip), result.map(&:id)
  end

  test 'skip and limit work together as expected' do
    first = 3
    skip = 2

    result = find(
      first: first,
      skip: skip,
    )

    assert_equal result.length, first
    assert_equal @resources.map(&:id)[skip, first], result.map(&:id)
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

    assert_equal @resources.map(&:id).sort.reverse, result.map(&:id)
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

    assert_equal @resources.map(&:id).sort.reverse[skip, first], result.map(&:id)
  end

  test 'deleted records included for authenticated user when include_deleted arg is true' do
    result = find(
      { include_deleted: true },
      @cataloger
    )

    expected = default_sort([@resources, @deleted_resources].flatten).map(&:id)
    assert_equal expected, result.map(&:id)
  end

  test 'deleted records not included for unauthenticated user even if include_deleted arg is true' do
    result = find(include_deleted: true)
    assert_equal @resources.map(&:id), result.map(&:id)
  end
end
