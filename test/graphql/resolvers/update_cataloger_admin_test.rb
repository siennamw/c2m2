require 'test_helper'

class Resolvers::UpdateCatalogerAdminTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::UpdateCatalogerAdmin.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @admin = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
      description: Faker::Lorem.sentence,
      admin: true,
    )

    @non_admin = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
      description: Faker::Lorem.sentence,
    )
  end

  test 'non-admin cataloger cannot update a cataloger' do
    assert_raises GraphQL::ExecutionError do
      perform({
        id: @admin.id,
        email: Faker::Internet.email,
        name: Faker::Name.name,
      }, @non_admin)
    end
  end

  test 'admin cataloger updating him/herself' do
    name = Faker::Name.name
    email = Faker::Internet.email
    description = Faker::Lorem.sentence

    updated_cataloger = perform({
      id: @admin.id,
      name: name,
      email: email,
      description: description,
    }, @admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.id, @admin.id
    assert_equal updated_cataloger.name, name
    assert_equal updated_cataloger.email, email
    assert_equal updated_cataloger.description, description
    assert_equal updated_cataloger.updated_by, @admin
  end

  test 'admin cataloger updating another cataloger' do
    name = Faker::Name.name
    email = Faker::Internet.email
    description = Faker::Lorem.sentence

    updated_cataloger = perform({
      id: @non_admin.id,
      name: name,
      email: email,
      description: description,
    }, @admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.id, @non_admin.id
    assert_equal updated_cataloger.name, name
    assert_equal updated_cataloger.email, email
    assert_equal updated_cataloger.description, description
    assert_equal updated_cataloger.updated_by, @admin
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = Faker::Name.name
    email = Faker::Internet.email
    description = Faker::Lorem.sentence

    record = perform({
      id: @non_admin.id,
      name: name,
      email: email,
      description: description,
    }, @admin)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.updated_by, event.created_by
    assert_equal 'UpdateCatalogerAdmin', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal event_payload.keys.sort, %w[admin description email name]
    assert_equal record.name, event_payload['name']
    assert_equal record.email, event_payload['email']
    assert_equal record.description, event_payload['description']
    assert_equal record.admin, event_payload['admin']

    # make sure no password fields
    assert_nil event_payload['password']
    assert_nil event_payload['password_digest']
  end

  test 'admin cataloger makes non-admin into an admin' do
    updated_cataloger = perform({
      id: @non_admin.id,
      name: @non_admin.name,
      email: @non_admin.email,
      description: @non_admin.description,
      admin: true,
    }, @admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.admin, true
  end

  test 'admin cataloger cannot change cataloger password' do
    updated_cataloger = perform({
      id: @non_admin.id,
      name: @non_admin.name,
      email: @non_admin.email,
      description: @non_admin.description,
      password: Faker::Internet.password(min_length: 8),
      admin: true,
    }, @admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.password_digest, @non_admin.password_digest
  end
end
