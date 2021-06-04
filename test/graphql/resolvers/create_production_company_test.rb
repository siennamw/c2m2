require 'test_helper'

class Resolvers::CreateProductionCompanyTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateProductionCompany.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
  end

  test 'creating new production company' do
    name = 'Prod Co'
    contact_info = 'prodco.com'

    production_co = perform(
      name: name,
      contact_info: contact_info,
    )

    assert production_co.persisted?
    assert_not_empty production_co.id
    assert_equal production_co.name, name
    assert_equal production_co.contact_info, contact_info
    assert_equal production_co.created_by, @cataloger
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'wefihukjnwefjknsd'
    contact_info = 'wefihukjnwefjknsd.com'

    record = perform(
      name: name,
      contact_info: contact_info,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.created_by, event.created_by
    assert_equal 'CreateProductionCompany', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal record.name, event_payload['name']
    assert_equal record.contact_info, event_payload['contact_info']
  end

  test 'creating new production company with predetermined ID' do
    name = 'Prod Co Inc'
    contact_info = 'prodcoinc.com'
    id = SecureRandom.uuid

    production_co = perform(
      id: id,
      name: name,
      contact_info: contact_info,
    )

    assert production_co.persisted?
    assert_equal production_co.id, id
    assert_equal production_co.name, name
    assert_equal production_co.contact_info, contact_info
    assert_equal production_co.created_by, @cataloger
  end

  test 'duplicate name returns expected error' do
    name = 'Production Co Rvfiuhmlqwekdkjn'

    perform(
      name: name,
    )

    result = perform(
      name: name,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Name has already been taken', result.message
  end
end
