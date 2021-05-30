require 'test_helper'

class Resolvers::CreateCatalogerTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::CreateCataloger.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @admin = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test',
      admin: true,
    )

    @non_admin = Cataloger.create!(
      name: 'non-admin',
      email: 'non-admin@email.com',
      password: 'test-test',
    )
  end

  test 'creating new cataloger' do
    name = 'Jane Doe'
    email = 'jane.doe@example.com'
    description = 'great cataloger'

    cataloger = perform({
      name: name,
      email: email,
      description: description,
    }, @admin)

    assert cataloger.persisted?
    assert_not_empty cataloger.id
    assert_equal cataloger.name, name
    assert_equal cataloger.email, email
    assert_equal cataloger.description, description
    assert cataloger.password.present?
    assert_equal cataloger.created_by, @admin
    assert_equal cataloger.admin, false
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'Jenny Doe'
    email = 'jenny.doe@example.com'
    description = 'great cataloger'

    cataloger = perform({
      name: name,
      email: email,
      description: description,
    }, @admin)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: cataloger.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal cataloger.created_by, event.created_by
    assert_equal 'CreateCataloger', event.name
    assert_equal cataloger.id, event.entity_id

    # event payload
    assert_equal cataloger.name, event_payload['name']
    assert_equal cataloger.email, event_payload['email']
    assert_equal cataloger.description, event_payload['description']
    assert_equal cataloger.admin, event_payload['admin']
  end

  test 'creating new cataloger with predetermined ID' do
    name = 'James Doe'
    email = 'james.doe@example.com'
    description = 'great cataloger'
    id = SecureRandom.uuid

    cataloger = perform({
      id: id,
      name: name,
      email: email,
      description: description,
    }, @admin)

    assert cataloger.persisted?
    assert_equal cataloger.id, id
    assert_equal cataloger.name, name
    assert_equal cataloger.email, email
    assert_equal cataloger.description, description
    assert cataloger.password.present?
    assert_equal cataloger.created_by, @admin
    assert_equal cataloger.admin, false
  end

  test 'new admin cataloger' do
    name = 'John Doe'
    email = 'john.doe@example.com'
    description = 'great cataloger'

    cataloger = perform({
      name: name,
      email: email,
      description: description,
      admin: true,
    }, @admin)

    assert cataloger.persisted?
    assert_equal cataloger.name, name
    assert_equal cataloger.email, email
    assert_equal cataloger.description, description
    assert cataloger.password.present?
    assert_equal cataloger.created_by, @admin
    assert_equal cataloger.admin, true
  end

  test 'non-admin cataloger cannot create new cataloger' do
    assert_raises GraphQL::ExecutionError do
      perform({}, @non_admin)
    end
  end
end
