require 'test_helper'

class Resolvers::UpdateCountryTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateCountry.new.call(nil, args, { current_user: @new_cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @country = Country.create!(
      name: 'Chile',
      description: 'lots of coast',
      created_by: @cataloger
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )
  end

  test 'updating a country' do
    name = 'Namibia'
    description = 'Home of the Namib desert'

    updated_country = perform(
      id: @country.id,
      name: name,
      description: description,
    )

    assert updated_country.persisted?
    assert_equal updated_country.id, @country.id
    assert_equal updated_country.name, name
    assert_equal updated_country.description, description
    assert_equal updated_country.created_by, @cataloger
    assert_equal updated_country.updated_by, @new_cataloger
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'Canada'
    description = 'Home of maple syrup'

    record = perform(
      id: @country.id,
      name: name,
      description: description,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.updated_by, event.created_by
    assert_equal 'UpdateCountry', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal event_payload.keys.sort, %w[description name]
    assert_equal record.name, event_payload['name']
    assert_equal record.description, event_payload['description']
  end
end
