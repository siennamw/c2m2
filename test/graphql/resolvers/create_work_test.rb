require 'test_helper'

class Resolvers::CreateWorkTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateWork.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')

    @country = Country.create!(name: 'a country', cataloger: @cataloger)
    @media_type = MediaType.create!(name: 'a media type', cataloger: @cataloger)
    @material_format = MaterialFormat.create!(name: 'a material format', cataloger: @cataloger)

    @repository = Repository.create!(name: 'a repository', location: 'Boulder, CO', cataloger: @cataloger)

    @collection_ids = []
    @composer_ids = []
    @director_ids = []
    @production_company_ids = []
    @publisher_ids = []

    2.times do |n|
      @collection_ids << Collection.create!(name: "collection #{n}", repository: @repository, cataloger: @cataloger).id
      @composer_ids << Composer.create!(name: "composer #{n}", cataloger: @cataloger).id
      @director_ids << Director.create!(name: "director #{n}", cataloger: @cataloger).id
      @production_company_ids << ProductionCompany.create!(name: "production company #{n}", cataloger: @cataloger).id
      @publisher_ids << Publisher.create!(name: "publisher #{n}", cataloger: @cataloger).id
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
    assert_equal work.media_type, @media_type
    assert_equal work.material_format, @material_format
  end

  test 'creating new work with all possible fields' do
    title = 'Main Title'
    secondary_title = 'Secondary Title'
    year = 1941

    finding_aid_link = ''
    digital_copy_link = 'digital_copy_link'
    rights_holder = 'rights_holder'
    citation_source = 'citation_source'
    alias_alternates = 'alias_alternates'
    cataloging_notes = 'cataloging_notes'

    work = perform(
      title: title,
      secondary_title: secondary_title,
      year: year,

      finding_aid_link: finding_aid_link,
      digital_copy_link: digital_copy_link,
      rights_holder: rights_holder,
      citation_source: citation_source,
      alias_alternates: alias_alternates,
      cataloging_notes: cataloging_notes,

      country_id: @country.id,
      media_type_id: @media_type.id,
      material_format_id: @material_format.id,

      collection_ids: @collection_ids,
      composer_ids: @composer_ids,
      director_ids: @director_ids,
      production_company_ids: @production_company_ids,
      publisher_ids: @publisher_ids,
    )

    assert work.persisted?
    assert_equal work.title, title
    assert_equal work.secondary_title, secondary_title
    assert_equal work.year, year

    assert_equal work.finding_aid_link, finding_aid_link
    assert_equal work.digital_copy_link, digital_copy_link
    assert_equal work.rights_holder, rights_holder
    assert_equal work.citation_source, citation_source
    assert_equal work.alias_alternates, alias_alternates
    assert_equal work.cataloging_notes, cataloging_notes

    assert_equal work.country, @country
    assert_equal work.media_type, @media_type
    assert_equal work.material_format, @material_format

    assert_equal work.cataloger, @cataloger

    assert_equal work.collections.map { |obj| obj.id }, @collection_ids
    assert_equal work.composers.map { |obj| obj.id }, @composer_ids
    assert_equal work.directors.map { |obj| obj.id }, @director_ids
    assert_equal work.production_companies.map { |obj| obj.id }, @production_company_ids
    assert_equal work.publishers.map { |obj| obj.id }, @publisher_ids
  end
end
