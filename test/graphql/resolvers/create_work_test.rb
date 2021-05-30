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
    assert_not_empty work.id
    assert_equal work.title, title
    assert_equal work.year, year
    assert_equal work.media_type, @media_type

    assert_equal work.created_by, @cataloger
  end

  test 'creating new work with the minimum required fields and predetermined ID' do
    title = 'Some Like it Hot'
    year = 1959
    id = SecureRandom.uuid

    work = perform(
      id: id,
      title: title,
      year: year,
      media_type_id: @media_type.id,
    )

    assert work.persisted?
    assert_equal work.id, id
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

  test 'creates expected Event' do
    event_count = Event.count
    title = 'flkmsdf'
    secondary_title = 'vlknegruho'
    alias_alternates = 'nvdshuwrg'
    imdb_link = 'http://www.flkmsdf.com'
    year = 1987

    record = perform(
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

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.created_by, event.created_by
    assert_equal 'CreateWork', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal record.title, event_payload['title']
    assert_equal record.secondary_title, event_payload['secondary_title']
    assert_equal record.alias_alternates, event_payload['alias_alternates']
    assert_equal record.imdb_link, event_payload['imdb_link']
    assert_equal record.year, event_payload['year']
    assert_equal record.country_id, event_payload['country_id']
    assert_equal record.media_type_id, event_payload['media_type_id']
    assert_equal record.composer_ids, event_payload['composer_ids']
    assert_equal record.director_ids, event_payload['director_ids']
    assert_equal record.orchestrator_ids, event_payload['orchestrator_ids']
    assert_equal record.production_company_ids, event_payload['production_company_ids']
  end

  test 'duplicate imdb_link returns expected error' do
    title = 'Princess Bride'
    year = 1987

    perform(
      title: title,
      year: year,
      media_type_id: @media_type.id,
      imdb_link: 'https://www.imdb.com/title/tt0093779/',
    )

    result = perform(
      title: 'Not Princess Bride',
      year: year,
      media_type_id: @media_type.id,
      imdb_link: 'https://www.imdb.com/title/tt0093779/',
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Imdb link has already been taken', result.message
  end

  test 'query params are stripped from imdb_link' do
    work = perform(
      title: 'Ghostbusters',
      year: 1984,
      media_type_id: @media_type.id,
      imdb_link: 'https://www.imdb.com/title/tt0087332/?ref_=fn_al_tt_1',
    )

    assert work.persisted?
    assert_equal 'https://www.imdb.com/title/tt0087332/', work.imdb_link
  end
end
