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

    @composer_ids = []
    @director_ids = []
    @orchestrator_ids = []
    @production_company_ids = []

    2.times do |n|
      @composer_ids << Composer.create!(
        name: "composer #{n}",
        created_by: @cataloger
      ).id
      @director_ids << Director.create!(
        name: "director #{n}",
        created_by: @cataloger
      ).id
      @orchestrator_ids << Composer.create!(
        name: "orchestrator #{n}",
        created_by: @cataloger
      ).id
      @production_company_ids << ProductionCompany.create!(
        name: "production company #{n}",
        created_by: @cataloger
      ).id
    end

    @media_types = []
    @countries = []

    3.times do |n|
      @countries << Country.create(
        name: "country #{n}",
        created_by: @cataloger
      )
      @media_types << MediaType.create!(
        name: "media type #{n}",
        created_by: @cataloger
      )
    end

    @work = Work.create!(
      title: 'Fight Club',
      year: 1999,
      country_id: @countries[0].id,
      media_type_id: @media_types[0].id,
      created_by: @cataloger
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
      },
      @new_cataloger
    )

    assert updated_work.persisted?
    assert_equal updated_work.id, @work.id
    assert_equal updated_work.title, title
    assert_equal updated_work.year, year

    assert_equal updated_work.media_type, @media_types[1]
    assert_equal updated_work.created_by, @cataloger
    assert_equal updated_work.updated_by, @new_cataloger

    # optional fields not passed are removed
    assert_nil updated_work.country
  end

  test 'updating a work with all possible fields' do
    title = 'Main Title'
    secondary_title = 'Secondary Title'
    alias_alternates = 'alias_alternates'
    imdb_link = 'http://www.example.com'

    year = 1941

    updated_work = perform(
      {
        id: @work.id,
        title: title,
        secondary_title: secondary_title,
        alias_alternates: alias_alternates,
        imdb_link: imdb_link,

        year: year,

        country_id: @countries[2].id,
        media_type_id: @media_types[2].id,

        composer_ids: @composer_ids,
        director_ids: @director_ids,
        orchestrator_ids: @orchestrator_ids,
        production_company_ids: @production_company_ids,
      },
      @new_cataloger
    )

    assert updated_work.persisted?
    assert_equal updated_work.id, @work.id

    assert_equal updated_work.title, title
    assert_equal updated_work.secondary_title, secondary_title
    assert_equal updated_work.alias_alternates, alias_alternates
    assert_equal updated_work.imdb_link, imdb_link

    assert_equal updated_work.year, year

    assert_equal updated_work.country, @countries[2]
    assert_equal updated_work.media_type, @media_types[2]

    assert_equal updated_work.created_by, @cataloger
    assert_equal updated_work.updated_by, @new_cataloger

    assert_equal updated_work.composers.map { |obj| obj.id }, @composer_ids
    assert_equal updated_work.directors.map { |obj| obj.id }, @director_ids
    assert_equal updated_work.orchestrators.map { |obj| obj.id }, @orchestrator_ids
    assert_equal updated_work.production_companies.map { |obj| obj.id }, @production_company_ids
  end
end
