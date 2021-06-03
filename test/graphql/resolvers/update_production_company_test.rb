require 'test_helper'

class Resolvers::UpdateProductionCompanyTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateProductionCompany.new.call(nil, args, { current_user: @new_cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @production_co = ProductionCompany.create!(
      name: 'a company',
      contact_info: 'company.com',
      created_by: @cataloger
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )
  end

  test 'updating a production company' do
    name = 'Prod Co'
    contact_info = 'prodco.com'

    updated_production_co = perform(
      id: @production_co.id,
      name: name,
      contact_info: contact_info,
    )

    assert updated_production_co.persisted?
    assert_equal updated_production_co.id, @production_co.id
    assert_equal updated_production_co.name, name
    assert_equal updated_production_co.contact_info, contact_info
    assert_equal updated_production_co.created_by, @cataloger
    assert_equal updated_production_co.updated_by, @new_cataloger
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'Another Prod Co'
    contact_info = 'anotherprodco.com'

    record = perform(
      id: @production_co.id,
      name: name,
      contact_info: contact_info,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.updated_by, event.created_by
    assert_equal 'UpdateProductionCompany', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal event_payload.keys.sort, %w[contact_info name]
    assert_equal record.name, event_payload['name']
    assert_equal record.contact_info, event_payload['contact_info']
  end
end
