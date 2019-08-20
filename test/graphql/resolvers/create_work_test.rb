require 'test_helper'

class Resolvers::CreateWorkTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateWork.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')

    @country = Country.create!(name: 'a country', created_by: @cataloger)
    @media_type = MediaType.create!(name: 'a media type', created_by: @cataloger)

    @composer_ids = []
    @director_ids = []
    @orchestrator_ids = []
    @production_company_ids = []

    2.times do |n|
      @composer_ids << Composer.create!(name: "composer #{n}", created_by: @cataloger).id
      @director_ids << Director.create!(name: "director #{n}", created_by: @cataloger).id
      @orchestrator_ids << Composer.create!(name: "orchestrator #{n}", created_by: @cataloger).id
      @production_company_ids << ProductionCompany.create!(name: "production company #{n}", created_by: @cataloger).id
    end
  end

  test 'creating new work with the minimum required fields' do
    title = 'Casa Blanca'
    year = 1942

    work = perform(
      title: title,
      year: year,
      media_type_id: @media_type.id,
    )

    assert work.persisted?
    assert_equal work.title, title
    assert_equal work.year, year
    assert_equal work.media_type, @media_type

    assert_equal work.created_by, @cataloger
  end

  test 'creating new work with all possible fields' do
    title = 'Main Title'
    secondary_title = 'Secondary Title'
    alias_alternates = 'alias_alternates'
    imdb_link = 'http://www.example.com'

    year = 1941

    work = perform(
      title: title,
      secondary_title: secondary_title,
      alias_alternates: alias_alternates,
      imdb_link: imdb_link,

      year: year,

      country_id: @country.id,
      media_type_id: @media_type.id,

      composer_ids: @composer_ids,
      director_ids: @director_ids,
      orchestrator_ids: @orchestrator_ids,
      production_company_ids: @production_company_ids,
    )

    assert work.persisted?
    assert_equal work.title, title
    assert_equal work.secondary_title, secondary_title
    assert_equal work.alias_alternates, alias_alternates
    assert_equal work.imdb_link, imdb_link

    assert_equal work.year, year

    assert_equal work.country, @country
    assert_equal work.media_type, @media_type

    assert_equal work.composers.map { |obj| obj.id }, @composer_ids
    assert_equal work.directors.map { |obj| obj.id }, @director_ids
    assert_equal work.orchestrators.map { |obj| obj.id }, @orchestrator_ids
    assert_equal work.production_companies.map { |obj| obj.id }, @production_company_ids

    assert_equal work.created_by, @cataloger
  end
end
