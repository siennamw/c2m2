require 'test_helper'

class Resolvers::UpdateResourceTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::UpdateResource.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test',
    )

    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2',
    )

    @admin_cataloger = Cataloger.create!(
      name: 'test3',
      email: 'test3@email.com',
      password: 'test_test3',
      admin: true,
    )

    media_type = MediaType.create!(
      name: 'test4',
      created_by: @cataloger,
    )

    @repository = Repository.create!(
      name: 'a repository',
      location: 'Boulder, CO',
      created_by: @cataloger,
    )

    @collection_ids = []

    2.times do |n|
      @collection_ids << Collection.create!(
        name: "collection #{n}",
        repository: @repository,
        created_by: @cataloger,
      ).id
    end

    @works = []
    @material_formats = []

    3.times do |n|
      @works << Work.create!(
        title: "work #{n}",
        year: 1990,
        media_type: media_type,
        created_by: @cataloger,
      )
      @material_formats << MaterialFormat.create!(
        name: "material format #{n}",
        created_by: @cataloger,
      )
    end

    @resource = Resource.create!(
      work_id: @works[0].id,
      material_format_id: @material_formats[0].id,
      created_by: @cataloger,
    )
  end

  test 'updating a resource with the minimum required fields' do
    updated_resource = perform(
      {
        id: @resource.id,
        work_id: @works[1].id,
        material_format_id: @material_formats[1].id,
      },
      @new_cataloger
    )

    assert updated_resource.persisted?
    assert_equal updated_resource.id, @resource.id

    # fall back to 'draft' if publication_status argument is missing
    assert_equal updated_resource.publication_status, 'draft'

    assert_equal updated_resource.work, @works[1]
    assert_equal updated_resource.material_format, @material_formats[1]

    assert_equal updated_resource.created_by, @cataloger
    assert_equal updated_resource.updated_by, @new_cataloger
  end

  test 'updating a resource with all possible fields' do
    digital_copy_link = 'digital_copy_link'
    citation_source = 'citation_source'
    cataloging_notes = 'cataloging_notes'
    publication_status = 'provisional'

    updated_resource = perform(
      {
        id: @resource.id,

        digital_copy_link: digital_copy_link,
        citation_source: citation_source,
        cataloging_notes: cataloging_notes,

        publication_status: publication_status,

        work_id: @works[2].id,
        material_format_id: @material_formats[2].id,

        collection_ids: @collection_ids,
      },
      @new_cataloger
    )

    assert updated_resource.persisted?
    assert_equal updated_resource.id, @resource.id

    assert_equal updated_resource.publication_status, publication_status

    assert_equal updated_resource.digital_copy_link, digital_copy_link
    assert_equal updated_resource.citation_source, citation_source
    assert_equal updated_resource.cataloging_notes, cataloging_notes

    assert_equal updated_resource.work, @works[2]
    assert_equal updated_resource.material_format, @material_formats[2]

    assert_equal updated_resource.collections.map { |obj| obj.id }, @collection_ids

    assert_equal updated_resource.created_by, @cataloger
    assert_equal updated_resource.updated_by, @new_cataloger
  end

  test 'non-admin attempting to update a resource to approved publication_status falls back to provisional' do
    updated_resource = perform(
      {
        id: @resource.id,
        work_id: @works[1].id,
        material_format_id: @material_formats[1].id,
        publication_status: 'approved'
      },
      @new_cataloger
    )

    assert updated_resource.persisted?
    assert_equal updated_resource.id, @resource.id

    # fall back to 'provisional' when cataloger is not an admin
    assert_equal updated_resource.publication_status, 'provisional'

    assert_equal updated_resource.work, @works[1]
    assert_equal updated_resource.material_format, @material_formats[1]

    assert_equal updated_resource.created_by, @cataloger
    assert_equal updated_resource.updated_by, @new_cataloger
  end

  test 'admin updating a resource to approved publication_status is successful' do
    publication_status = 'approved'

    updated_resource = perform(
      {
        id: @resource.id,
        work_id: @works[2].id,
        material_format_id: @material_formats[2].id,
        publication_status: publication_status
      },
      @admin_cataloger
    )

    assert updated_resource.persisted?
    assert_equal updated_resource.id, @resource.id

    # admin can set publication_status to 'approved'
    assert_equal updated_resource.publication_status, publication_status

    assert_equal updated_resource.work, @works[2]
    assert_equal updated_resource.material_format, @material_formats[2]

    assert_equal updated_resource.created_by, @cataloger
    assert_equal updated_resource.updated_by, @admin_cataloger
  end
end
