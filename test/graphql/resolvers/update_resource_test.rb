require 'test_helper'

class Resolvers::UpdateResourceTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::UpdateResource.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )

    @new_cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )

    @admin_cataloger = Cataloger.create!(
      admin: true,
      name: Faker::Name.name,
      email: Faker::Internet.email,
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

    4.times do |n|
      @works << Work.create!(
        title: "work #{n}",
        year_start: 1990,
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

  test 'creates expected Event' do
    event_count = Event.count
    digital_copy_link = 'new_digital_copy_link'
    citation_source = 'new_citation_source'
    cataloging_notes = 'new_cataloging_notes'
    publication_status = 'draft'

    record = perform(
      {
        id: @resource.id,

        digital_copy_link: digital_copy_link,
        citation_source: citation_source,
        cataloging_notes: cataloging_notes,

        publication_status: publication_status,

        work_id: @works[3].id,
        material_format_id: @material_formats[3].id,

        collection_ids: @collection_ids,
      },
      @new_cataloger
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.updated_by, event.created_by
    assert_equal 'UpdateResource', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal event_payload.keys.sort, %w[
      cataloging_notes
      citation_source
      collection_ids
      digital_copy_link
      material_format_id
      publication_status
      work_id
    ]
    assert_equal record.digital_copy_link, event_payload['digital_copy_link']
    assert_equal record.citation_source, event_payload['citation_source']
    assert_equal record.cataloging_notes, event_payload['cataloging_notes']
    assert_equal record.publication_status, event_payload['publication_status']
    assert_equal record.work_id, event_payload['work_id']
    assert_equal record.material_format_id, event_payload['material_format_id']
    assert_equal record.collection_ids, event_payload['collection_ids']
  end
end
