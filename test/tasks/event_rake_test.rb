require 'test_helper'

class EventRakeTest < ActiveSupport::TestCase
  def perform(task = 'event:synthetic:all')
    Rake::Task[task].execute
  end

  setup do
    @cataloger = Cataloger.create!(
      admin: true,
      description: Faker::Lorem.sentence,
      email: Faker::Internet.email,
      name: Faker::Name.name,
    )
    @repository = Repository.create!(
      created_by: @cataloger,
      location: Faker::Address.city,
      name: Faker::Lorem.word,
      website: Faker::Internet.url,
    )
    @collection = Collection.create!(
      created_by: @cataloger,
      description: Faker::Lorem.sentence,
      finding_aid_link: Faker::Internet.url,
      name: Faker::Lorem.word,
      repository: @repository,
    )
    @composer = Composer.create!(
      created_by: @cataloger,
      imdb_link: Faker::Internet.url,
      name: Faker::Name.name,
    )
    @country = Country.create!(
      created_by: @cataloger,
      description: Faker::Lorem.sentence,
      name: Faker::Address.country,
    )
    @director = Director.create!(
      created_by: @cataloger,
      imdb_link: Faker::Internet.url,
      name: Faker::Name.name,
    )
    @material_format = MaterialFormat.create!(
      created_by: @cataloger,
      description: Faker::Lorem.sentence,
      name: Faker::Lorem.word,
    )
    @media_type = MediaType.create!(
      created_by: @cataloger,
      description: Faker::Lorem.sentence,
      name: Faker::Lorem.word,
    )
    @production_company = ProductionCompany.create!(
      contact_info: Faker::Address.city,
      created_by: @cataloger,
      name: Faker::Lorem.word,
    )
    @work = Work.create!(
      alias_alternates: Faker::Lorem.word,
      composers: [@composer],
      country: @country,
      created_by: @cataloger,
      directors: [@director],
      imdb_link: Faker::Internet.url,
      media_type: @media_type,
      orchestrators: [@composer],
      production_companies: [@production_company],
      secondary_title: Faker::Lorem.word,
      title: Faker::Lorem.word,
      year_start: 2021,
    )
    @resource = Resource.create!(
      cataloging_notes: Faker::Lorem.sentence,
      citation_source: Faker::Lorem.word,
      collections: [@collection],
      created_by: @cataloger,
      digital_copy_link: Faker::Internet.url,
      material_format: @material_format,
      publication_status: 'draft',
      work: @work,
    )
    @records = [
      @cataloger,
      @collection,
      @composer,
      @country,
      @director,
      @material_format,
      @media_type,
      @production_company,
      @repository,
      @resource,
      @work,
    ]
  end

  test 'event:synthetic:all creates expected Events' do
    event_count = Event.count
    perform

    assert_equal event_count + @records.length, Event.count
    @records.each do |record|
      event = Event.find_by(entity_id: record.id)

      assert_equal event.created_by, record.created_by || @cataloger
      assert_equal event.entity_id, record.id
      assert_equal event.name, "Create#{record.class}"
      assert_equal event.synthetic, true
      refute_empty event.payload
    end
  end

  test 'event:synthetic:catalogers creates expected Event payload' do
    event_count = Event.count
    perform('event:synthetic:catalogers')

    assert_equal event_count + 1, Event.count

    record = @cataloger
    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    assert_equal event_payload.keys.sort, %w[admin description email name]
    assert_equal record.admin, event_payload['admin']
    assert_equal record.description, event_payload['description']
    assert_equal record.email, event_payload['email']
    assert_equal record.name, event_payload['name']
  end

  test 'event:synthetic:collections creates expected Event payload' do
    event_count = Event.count
    perform('event:synthetic:collections')

    assert_equal event_count + 1, Event.count

    record = @collection
    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    assert_equal event_payload.keys.sort, %w[description finding_aid_link name repository_id]
    assert_equal record.description, event_payload['description']
    assert_equal record.finding_aid_link, event_payload['finding_aid_link']
    assert_equal record.name, event_payload['name']
    assert_equal record.repository_id, event_payload['repository_id']
  end

  test 'event:synthetic:composers creates expected Event payload' do
    event_count = Event.count
    perform('event:synthetic:composers')

    assert_equal event_count + 1, Event.count

    record = @composer
    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    assert_equal event_payload.keys.sort, %w[imdb_link name]
    assert_equal record.imdb_link, event_payload['imdb_link']
    assert_equal record.name, event_payload['name']
  end

  test 'event:synthetic:countries creates expected Event payload' do
    event_count = Event.count
    perform('event:synthetic:countries')

    assert_equal event_count + 1, Event.count

    record = @country
    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    assert_equal event_payload.keys.sort, %w[description name]
    assert_equal record.description, event_payload['description']
    assert_equal record.name, event_payload['name']
  end

  test 'event:synthetic:directors creates expected Event payload' do
    event_count = Event.count
    perform('event:synthetic:directors')

    assert_equal event_count + 1, Event.count

    record = @director
    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    assert_equal event_payload.keys.sort, %w[imdb_link name]
    assert_equal record.imdb_link, event_payload['imdb_link']
    assert_equal record.name, event_payload['name']
  end

  test 'event:synthetic:material_formats creates expected Event payload' do
    event_count = Event.count
    perform('event:synthetic:material_formats')

    assert_equal event_count + 1, Event.count

    record = @material_format
    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    assert_equal event_payload.keys.sort, %w[description name]
    assert_equal record.description, event_payload['description']
    assert_equal record.name, event_payload['name']
  end

  test 'event:synthetic:media_types creates expected Event payload' do
    event_count = Event.count
    perform('event:synthetic:media_types')

    assert_equal event_count + 1, Event.count

    record = @media_type
    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    assert_equal event_payload.keys.sort, %w[description name]
    assert_equal record.description, event_payload['description']
    assert_equal record.name, event_payload['name']
  end

  test 'event:synthetic:production_companies creates expected Event payload' do
    event_count = Event.count
    perform('event:synthetic:production_companies')

    assert_equal event_count + 1, Event.count

    record = @production_company
    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    assert_equal event_payload.keys.sort, %w[contact_info name]
    assert_equal record.contact_info, event_payload['contact_info']
    assert_equal record.name, event_payload['name']
  end

  test 'event:synthetic:repositories creates expected Event payload' do
    event_count = Event.count
    perform('event:synthetic:repositories')

    assert_equal event_count + 1, Event.count

    record = @repository
    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    assert_equal event_payload.keys.sort, %w[location name website]
    assert_equal record.location, event_payload['location']
    assert_equal record.name, event_payload['name']
    assert_equal record.website, event_payload['website']
  end

  test 'event:synthetic:resources creates expected Event payload' do
    event_count = Event.count
    perform('event:synthetic:resources')

    assert_equal event_count + 1, Event.count

    record = @resource
    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    assert_equal event_payload.keys.sort, %w[
      cataloging_notes
      citation_source
      collection_ids
      digital_copy_link
      material_format_id
      publication_status
      work_id
    ]
    assert_equal record.cataloging_notes, event_payload['cataloging_notes']
    assert_equal record.citation_source, event_payload['citation_source']
    assert_equal record.collection_ids, event_payload['collection_ids']
    assert_equal record.digital_copy_link, event_payload['digital_copy_link']
    assert_equal record.material_format_id, event_payload['material_format_id']
    assert_equal record.publication_status, event_payload['publication_status']
    assert_equal record.work_id, event_payload['work_id']
  end

  test 'event:synthetic:works creates expected Event payload' do
    event_count = Event.count
    perform('event:synthetic:works')

    assert_equal event_count + 1, Event.count

    record = @work
    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    assert_equal event_payload.keys.sort, %w[
      alias_alternates
      composer_ids
      country_id
      director_ids
      imdb_link
      media_type_id
      orchestrator_ids
      production_company_ids
      secondary_title
      title
      year_end
      year_start
    ]
    assert_equal record.alias_alternates, event_payload['alias_alternates']
    assert_equal record.composer_ids, event_payload['composer_ids']
    assert_equal record.country_id, event_payload['country_id']
    assert_equal record.director_ids, event_payload['director_ids']
    assert_equal record.imdb_link, event_payload['imdb_link']
    assert_equal record.media_type_id, event_payload['media_type_id']
    assert_equal record.orchestrator_ids, event_payload['orchestrator_ids']
    assert_equal record.production_company_ids, event_payload['production_company_ids']
    assert_equal record.secondary_title, event_payload['secondary_title']
    assert_equal record.title, event_payload['title']
    assert_equal record.year_start, event_payload['year_start']
    assert_equal record.year_end, event_payload['year_end']
  end
end
