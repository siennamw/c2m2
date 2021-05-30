require 'test_helper'

class Resolvers::CreateMaterialFormatTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::CreateMaterialFormat.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @admin = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test',
      admin: true
    )
    @non_admin = Cataloger.create!(
      name: 'non-admin',
      email: 'non.admin@email.com',
      password: 'test_test'
    )
  end

  test 'creating new material format' do
    name = 'new material format'
    description = 'awesome material format'

    material_format = perform({
      name: name,
      description: description,
    }, @admin)

    assert material_format.persisted?
    assert_not_empty material_format.id
    assert_equal material_format.name, name
    assert_equal material_format.description, description
    assert_equal material_format.created_by, @admin
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'great material format'
    description = 'super material format'

    record = perform({
      name: name,
      description: description,
    }, @admin)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.created_by, event.created_by
    assert_equal 'CreateMaterialFormat', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal record.name, event_payload['name']
    assert_equal record.description, event_payload['description']
  end

  test 'creating new material format country with predetermined ID' do
    name = 'another material format'
    description = 'great material format'
    id = SecureRandom.uuid

    material_format = perform({
      id: id,
      name: name,
      description: description,
    }, @admin)

    assert material_format.persisted?
    assert_equal material_format.id, id
    assert_equal material_format.name, name
    assert_equal material_format.description, description
    assert_equal material_format.created_by, @admin
  end

  test 'non-admin cannot create a material format' do
    name = 'better material format'
    description = 'best material format'

    assert_raises GraphQL::ExecutionError do
      perform({
        name: name,
        description: description,
      }, @non_admin)
    end
  end
end
