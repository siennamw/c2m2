require 'test_helper'

class Resolvers::UpdateWorkTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::UpdateWork.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )

    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )

    @admin_cataloger = Cataloger.create!(
      name: 'test3',
      email: 'test3@email.com',
      password: 'test_test3',
      admin: true,
    )

    @repository = Repository.create!(
      name: 'a repository',
      location: 'Boulder, CO',
      cataloger: @cataloger
    )

    @collection_ids = []
    @composer_ids = []
    @director_ids = []
    @production_company_ids = []
    @publisher_ids = []

    2.times do |n|
      @collection_ids << Collection.create!(
        name: "collection #{n}",
        repository: @repository,
        cataloger: @cataloger
      ).id
      @composer_ids << Composer.create!(
        name: "composer #{n}",
        cataloger: @cataloger
      ).id
      @director_ids << Director.create!(
        name: "director #{n}",
        cataloger: @cataloger
      ).id
      @production_company_ids << ProductionCompany.create!(
        name: "production company #{n}",
        cataloger: @cataloger
      ).id
      @publisher_ids << Publisher.create!(
        name: "publisher #{n}",
        cataloger: @cataloger
      ).id
    end

    @media_types = []
    @material_formats = []
    @countries = []

    3.times do |n|
      @countries << Country.create(
        name: "country #{n}",
        cataloger: @cataloger
      )
      @media_types << MediaType.create!(
        name: "media type #{n}",
        cataloger: @cataloger
      )
      @material_formats << MaterialFormat.create!(
        name: "material format #{n}",
        cataloger: @cataloger
      )
    end

    @work = Work.create!(
      title: 'Fight Club',
      year: 1999,
      country_id: @countries[0].id,
      media_type_id: @media_types[0].id,
      material_format_id: @material_formats[0].id,
      cataloger: @cataloger
    )
  end

  test 'updating a work with the minimum required fields' do
    title = 'Casa Blanca'
    year = 1942

    updated_work = perform(
      {
        id: @work.id,
        title: title,
        year: year,
        media_type_id: @media_types[1].id,
        material_format_id: @material_formats[1].id,
      },
      @new_cataloger
    )

    assert updated_work.persisted?
    assert_equal updated_work.id, @work.id
    assert_equal updated_work.title, title
    assert_equal updated_work.year, year

    # fall back to 'draft' if publication_status argument is missing
    assert_equal updated_work.publication_status, 'draft'

    assert_equal updated_work.media_type, @media_types[1]
    assert_equal updated_work.material_format, @material_formats[1]
    assert_equal updated_work.cataloger, @new_cataloger

    # optional fields not passed are removed
    assert_nil updated_work.country
  end

  test 'updating a work with all possible fields' do
    title = 'Main Title'
    secondary_title = 'Secondary Title'
    year = 1941

    finding_aid_link = ''
    digital_copy_link = 'digital_copy_link'
    rights_holder = 'rights_holder'
    citation_source = 'citation_source'
    alias_alternates = 'alias_alternates'
    cataloging_notes = 'cataloging_notes'
    publication_status = 'provisional'

    updated_work = perform(
      {
        id: @work.id,
        title: title,
        secondary_title: secondary_title,
        year: year,

        finding_aid_link: finding_aid_link,
        digital_copy_link: digital_copy_link,
        rights_holder: rights_holder,
        citation_source: citation_source,
        alias_alternates: alias_alternates,
        cataloging_notes: cataloging_notes,

        publication_status: publication_status,

        country_id: @countries[2].id,
        media_type_id: @media_types[2].id,
        material_format_id: @material_formats[2].id,

        collection_ids: @collection_ids,
        composer_ids: @composer_ids,
        director_ids: @director_ids,
        production_company_ids: @production_company_ids,
        publisher_ids: @publisher_ids,
      },
      @new_cataloger
    )

    assert updated_work.persisted?
    assert_equal updated_work.id, @work.id
    assert_equal updated_work.title, title
    assert_equal updated_work.secondary_title, secondary_title
    assert_equal updated_work.year, year

    assert_equal updated_work.publication_status, publication_status

    assert_equal updated_work.finding_aid_link, finding_aid_link
    assert_equal updated_work.digital_copy_link, digital_copy_link
    assert_equal updated_work.rights_holder, rights_holder
    assert_equal updated_work.citation_source, citation_source
    assert_equal updated_work.alias_alternates, alias_alternates
    assert_equal updated_work.cataloging_notes, cataloging_notes

    assert_equal updated_work.country, @countries[2]
    assert_equal updated_work.media_type, @media_types[2]
    assert_equal updated_work.material_format, @material_formats[2]

    assert_equal updated_work.cataloger, @new_cataloger

    assert_equal updated_work.collections.map { |obj| obj.id }, @collection_ids
    assert_equal updated_work.composers.map { |obj| obj.id }, @composer_ids
    assert_equal updated_work.directors.map { |obj| obj.id }, @director_ids
    assert_equal updated_work.production_companies.map { |obj| obj.id }, @production_company_ids
    assert_equal updated_work.publishers.map { |obj| obj.id }, @publisher_ids
  end

  test 'non-admin attempting to update a work to approved publication_status' do
    title = 'Casa Blanca'
    year = 1942

    updated_work = perform(
      {
        id: @work.id,
        title: title,
        year: year,
        media_type_id: @media_types[1].id,
        material_format_id: @material_formats[1].id,
        publication_status: 'approved'
      },
      @new_cataloger
    )

    assert updated_work.persisted?
    assert_equal updated_work.id, @work.id
    assert_equal updated_work.title, title
    assert_equal updated_work.year, year

    # fall back to 'provisional' when cataloger is not an admin
    assert_equal updated_work.publication_status, 'provisional'

    assert_equal updated_work.media_type, @media_types[1]
    assert_equal updated_work.material_format, @material_formats[1]
    assert_equal updated_work.cataloger, @new_cataloger

    # optional fields not passed are removed
    assert_nil updated_work.country
  end

  test 'admin updating a work to approved publication_status' do
    title = 'Casa Blanca'
    year = 1942
    publication_status = 'approved'

    updated_work = perform(
      {
        id: @work.id,
        title: title,
        year: year,
        media_type_id: @media_types[1].id,
        material_format_id: @material_formats[1].id,
        publication_status: publication_status
      },
      @admin_cataloger
    )

    assert updated_work.persisted?
    assert_equal updated_work.id, @work.id
    assert_equal updated_work.title, title
    assert_equal updated_work.year, year

    # admin can set publication_status to 'approved'
    assert_equal updated_work.publication_status, publication_status

    assert_equal updated_work.media_type, @media_types[1]
    assert_equal updated_work.material_format, @material_formats[1]
    assert_equal updated_work.cataloger, @admin_cataloger

    # optional fields not passed are removed
    assert_nil updated_work.country
  end
end
