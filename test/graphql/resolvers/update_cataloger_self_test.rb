require 'test_helper'

class Resolvers::UpdateCatalogerSelfTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::UpdateCatalogerSelf.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @admin = Cataloger.create!(
      admin: true,
      name: Faker::Name.name,
      email: Faker::Internet.email,
      description: Faker::Lorem.sentence,
    )

    @non_admin = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
      description: Faker::Lorem.sentence,
    )
  end

  test 'non-admin cataloger cannot edit cataloger other than self' do
    assert_raises GraphQL::ExecutionError do
      perform({
        id: @admin.id,
        email: Faker::Internet.email,
        name: Faker::Name.name,
      }, @non_admin)
    end
  end

  test 'admin cataloger cannot edit cataloger other than self' do
    assert_raises GraphQL::ExecutionError do
      perform({
        id: @non_admin.id,
        email: Faker::Internet.email,
        name: Faker::Name.name,
      }, @admin)
    end
  end

  test 'admin cataloger updating him/herself' do
    name = Faker::Name.name
    email = Faker::Internet.email
    description = Faker::Lorem.sentence
    new_password = Faker::Internet.password(min_length: 8)

    updated_cataloger = perform({
      id: @admin.id,
      name: name,
      email: email,
      description: description,
      password: @admin.password,
      new_password: new_password
    }, @admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.id, @admin.id
    assert_equal updated_cataloger.name, name
    assert_equal updated_cataloger.email, email
    assert_equal updated_cataloger.description, description
    assert_equal updated_cataloger.authenticate(new_password), updated_cataloger
    assert_equal updated_cataloger.updated_by, @admin
  end

  test 'non-admin cataloger updating him/herself' do
    name = Faker::Name.name
    email = Faker::Internet.email
    description = Faker::Lorem.sentence
    new_password = Faker::Internet.password(min_length: 8)

    updated_cataloger = perform({
      id: @non_admin.id,
      name: name,
      email: email,
      description: description,
      password: @non_admin.password,
      new_password: new_password
    }, @non_admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.id, @non_admin.id
    assert_equal updated_cataloger.name, name
    assert_equal updated_cataloger.email, email
    assert_equal updated_cataloger.description, description
    assert_equal updated_cataloger.authenticate(new_password), updated_cataloger
    assert_equal updated_cataloger.updated_by, @non_admin
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
      password: @non_admin.password,
    }, @non_admin)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.updated_by, event.created_by
    assert_equal 'UpdateCatalogerSelf', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal event_payload.keys.sort, %w[admin description email name]
    assert_equal record.name, event_payload['name']
    assert_equal record.email, event_payload['email']
    assert_equal record.description, event_payload['description']
    assert_equal record.admin, event_payload['admin']

    # make sure no password fields
    assert_nil event_payload['password']
    assert_nil event_payload['new_password']
    assert_nil event_payload['password_digest']
  end

  test 'omitting new_password field means that password is not changed' do
    name = Faker::Name.name

    updated_cataloger = perform({
      id: @non_admin.id,
      name: name,
      email: @non_admin.email,
      description: @non_admin.description,
      password: @non_admin.password,
    }, @non_admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.authenticate(@non_admin.password), updated_cataloger
  end

  test 'non-admin cataloger cannot make self an admin' do
    updated_cataloger = perform({
      id: @non_admin.id,
      admin: true,
      name: @non_admin.name,
      email: @non_admin.email,
      description: @non_admin.description,
      password: @non_admin.password,
    }, @non_admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.admin, false
  end

  test 'admin cataloger can make self not an admin' do
    updated_cataloger = perform({
      id: @admin.id,
      admin: false,
      name: @admin.name,
      email: @admin.email,
      description: @admin.description,
      password: @admin.password,
    }, @admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.admin, false
  end
end
