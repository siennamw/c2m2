require 'test_helper'

class Resolvers::CreateResourceTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateResource.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')

    media_type = MediaType.create!(name: 'a media type', created_by: @cataloger)
    @film = Film.create!(title: 'a film', media_type: media_type, year: 1990, created_by: @cataloger)

    @material_format = MaterialFormat.create!(name: 'a material format', created_by: @cataloger)

    @repository = Repository.create!(name: 'a repository', location: 'Boulder, CO', created_by: @cataloger)

    @collection_ids = []

    2.times do |n|
      @collection_ids << Collection.create!(name: "collection #{n}", repository: @repository, created_by: @cataloger).id
    end
  end

  test 'creating new resource with the minimum required fields' do
    resource = perform(
      film_id: @film.id,
      material_format_id: @material_format.id,
    )

    assert resource.persisted?
    assert_equal resource.film, @film
    assert_equal resource.material_format, @material_format
    assert_equal resource.publication_status, 'draft'

    assert_equal resource.created_by, @cataloger
  end

  test 'creating new resource with all possible fields' do
    finding_aid_link = ''
    digital_copy_link = 'digital_copy_link'
    citation_source = 'citation_source'
    cataloging_notes = 'cataloging_notes'
    publication_status = 'provisional'

    resource = perform(
      finding_aid_link: finding_aid_link,
      digital_copy_link: digital_copy_link,
      citation_source: citation_source,
      cataloging_notes: cataloging_notes,
      publication_status: publication_status,

      film_id: @film.id,
      material_format_id: @material_format.id,

      collection_ids: @collection_ids,
    )

    assert resource.persisted?

    assert_equal resource.finding_aid_link, finding_aid_link
    assert_equal resource.digital_copy_link, digital_copy_link
    assert_equal resource.citation_source, citation_source
    assert_equal resource.cataloging_notes, cataloging_notes
    assert_equal resource.publication_status, publication_status

    assert_equal resource.film, @film
    assert_equal resource.material_format, @material_format

    assert_equal resource.collections.map { |obj| obj.id }, @collection_ids

    assert_equal resource.created_by, @cataloger
  end
end
