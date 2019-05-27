require 'test_helper'

class Resolvers::CreateWorkTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateWork.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')

    @country = Country.create!(name: 'a country', created_by: @cataloger)
    @media_type = MediaType.create!(name: 'a media type', created_by: @cataloger)
    @material_format = MaterialFormat.create!(name: 'a material format', created_by: @cataloger)

    @repository = Repository.create!(name: 'a repository', location: 'Boulder, CO', created_by: @cataloger)

    @collection_ids = []
    @composer_ids = []
    @director_ids = []
    @orchestrator_ids = []
    @production_company_ids = []
    @publisher_ids = []

    2.times do |n|
      @collection_ids << Collection.create!(name: "collection #{n}", repository: @repository, created_by: @cataloger).id
      @composer_ids << Composer.create!(name: "composer #{n}", created_by: @cataloger).id
      @director_ids << Director.create!(name: "director #{n}", created_by: @cataloger).id
      @orchestrator_ids << Composer.create!(name: "orchestrator #{n}", created_by: @cataloger).id
      @production_company_ids << ProductionCompany.create!(name: "production company #{n}", created_by: @cataloger).id
      @publisher_ids << Publisher.create!(name: "publisher #{n}", created_by: @cataloger).id
    end
  end

  test 'creating new work with the minimum required fields' do
    title = 'Casa Blanca'
    year = 1942

    work = perform(
      title: title,
      year: year,
      media_type_id: @media_type.id,
      material_format_id: @material_format.id,
    )

    assert work.persisted?
    assert_equal work.title, title
    assert_equal work.year, year
    assert_equal work.publication_status, 'draft'
    assert_equal work.media_type, @media_type
    assert_equal work.material_format, @material_format

    assert_equal work.created_by, @cataloger
  end

  test 'creating new work with all possible fields' do
    title = 'Main Title'
    secondary_title = 'Secondary Title'
    year = 1941

    finding_aid_link = ''
    digital_copy_link = 'digital_copy_link'
    citation_source = 'citation_source'
    alias_alternates = 'alias_alternates'
    cataloging_notes = 'cataloging_notes'
    publication_status = 'provisional'

    work = perform(
      title: title,
      secondary_title: secondary_title,
      year: year,

      finding_aid_link: finding_aid_link,
      digital_copy_link: digital_copy_link,
      citation_source: citation_source,
      alias_alternates: alias_alternates,
      cataloging_notes: cataloging_notes,
      publication_status: publication_status,

      country_id: @country.id,
      media_type_id: @media_type.id,
      material_format_id: @material_format.id,

      collection_ids: @collection_ids,
      composer_ids: @composer_ids,
      director_ids: @director_ids,
      orchestrator_ids: @orchestrator_ids,
      production_company_ids: @production_company_ids,
      publisher_ids: @publisher_ids,
    )

    assert work.persisted?
    assert_equal work.title, title
    assert_equal work.secondary_title, secondary_title
    assert_equal work.year, year

    assert_equal work.finding_aid_link, finding_aid_link
    assert_equal work.digital_copy_link, digital_copy_link
    assert_equal work.citation_source, citation_source
    assert_equal work.alias_alternates, alias_alternates
    assert_equal work.cataloging_notes, cataloging_notes
    assert_equal work.publication_status, publication_status

    assert_equal work.country, @country
    assert_equal work.media_type, @media_type
    assert_equal work.material_format, @material_format

    assert_equal work.collections.map { |obj| obj.id }, @collection_ids
    assert_equal work.composers.map { |obj| obj.id }, @composer_ids
    assert_equal work.directors.map { |obj| obj.id }, @director_ids
    assert_equal work.orchestrators.map { |obj| obj.id }, @orchestrator_ids
    assert_equal work.production_companies.map { |obj| obj.id }, @production_company_ids
    assert_equal work.publishers.map { |obj| obj.id }, @publisher_ids

    assert_equal work.created_by, @cataloger
  end
end
