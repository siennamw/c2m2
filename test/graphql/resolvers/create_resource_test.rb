require 'test_helper'

class Resolvers::CreateResourceTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateResource.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )

    media_type = MediaType.create!(name: 'a media type', created_by: @cataloger)
    @work = Work.create!(title: 'a film', media_type: media_type, year_start: 1990, created_by: @cataloger)

    @material_format = MaterialFormat.create!(name: 'a material format', created_by: @cataloger)

    @repository = Repository.create!(name: 'a repository', location: 'Boulder, CO', created_by: @cataloger)

    @collection_ids = []

    2.times do |n|
      @collection_ids << Collection.create!(name: "collection #{n}", repository: @repository, created_by: @cataloger).id
    end
  end

  test 'creating new resource with the minimum required fields' do
    resource = perform(
      work_id: @work.id,
      material_format_id: @material_format.id,
    )

    assert resource.persisted?
    assert_not_empty resource.id
    assert_equal resource.work, @work
    assert_equal resource.material_format, @material_format
    assert_equal resource.publication_status, 'draft'

    assert_equal resource.created_by, @cataloger
  end

  test 'creating new resource with the minimum required fields and predetermined ID' do
    id = SecureRandom.uuid

    resource = perform(
      id: id,
      work_id: @work.id,
      material_format_id: @material_format.id,
    )

    assert resource.persisted?
    assert_equal resource.id, id
    assert_equal resource.work, @work
    assert_equal resource.material_format, @material_format
    assert_equal resource.publication_status, 'draft'

    assert_equal resource.created_by, @cataloger
  end

  test 'creating new resource with all possible fields' do
    digital_copy_link = 'digital_copy_link'
    citation_source = 'citation_source'
    cataloging_notes = 'cataloging_notes'
    publication_status = 'provisional'

    resource = perform(
      digital_copy_link: digital_copy_link,
      citation_source: citation_source,
      cataloging_notes: cataloging_notes,
      publication_status: publication_status,

      work_id: @work.id,
      material_format_id: @material_format.id,

      collection_ids: @collection_ids,
    )

    assert resource.persisted?

    assert_equal resource.digital_copy_link, digital_copy_link
    assert_equal resource.citation_source, citation_source
    assert_equal resource.cataloging_notes, cataloging_notes
    assert_equal resource.publication_status, publication_status

    assert_equal resource.work, @work
    assert_equal resource.material_format, @material_format

    assert_equal resource.collections.map { |obj| obj.id }, @collection_ids

    assert_equal resource.created_by, @cataloger
  end

  test 'creates expected Event' do
    event_count = Event.count
    digital_copy_link = 'digital_copy_link'
    citation_source = 'citation_source'
    cataloging_notes = 'cataloging_notes'
    publication_status = 'provisional'

    record = perform(
      digital_copy_link: digital_copy_link,
      citation_source: citation_source,
      cataloging_notes: cataloging_notes,
      publication_status: publication_status,

      work_id: @work.id,
      material_format_id: @material_format.id,

      collection_ids: @collection_ids,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.created_by, event.created_by
    assert_equal 'CreateResource', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal record.digital_copy_link, event_payload['digital_copy_link']
    assert_equal record.citation_source, event_payload['citation_source']
    assert_equal record.cataloging_notes, event_payload['cataloging_notes']
    assert_equal record.publication_status, event_payload['publication_status']
    assert_equal record.work_id, event_payload['work_id']
    assert_equal record.material_format_id, event_payload['material_format_id']
    assert_equal record.collection_ids, event_payload['collection_ids']
  end
end
