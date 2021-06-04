require 'test_helper'

class Resolvers::CreateCountryTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateCountry.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
  end

  test 'creating new country' do
    name = Faker::Lorem.word
    description = Faker::Lorem.sentence

    country = perform(
      name: name,
      description: description,
    )

    assert country.persisted?
    assert_not_empty country.id
    assert_equal country.name, name
    assert_equal country.description, description
    assert_equal country.created_by, @cataloger
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = Faker::Lorem.word
    description = Faker::Lorem.sentence

    record = perform(
      name: name,
      description: description,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.created_by, event.created_by
    assert_equal 'CreateCountry', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal record.name, event_payload['name']
    assert_equal record.description, event_payload['description']
  end

  test 'creating new country with predetermined ID' do
    name = Faker::Lorem.word
    description = Faker::Lorem.sentence
    id = SecureRandom.uuid

    country = perform(
      id: id,
      name: name,
      description: description,
    )

    assert country.persisted?
    assert_equal country.id, id
    assert_equal country.name, name
    assert_equal country.description, description
    assert_equal country.created_by, @cataloger
  end
end
