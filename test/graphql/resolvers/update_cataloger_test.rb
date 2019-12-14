require 'test_helper'

class Resolvers::UpdateCatalogerTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::UpdateCataloger.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @admin = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test',
      admin: true,
      description: 'test description'
    )

    @non_admin = Cataloger.create!(
      name: 'non-admin',
      email: 'non-admin@email.com',
      password: 'test-test',
      description: 'description test'
    )
  end

  test 'admin cataloger updating him/herself' do
    name = 'Jane Doe'
    email = 'jane.doe@example.com'
    description = 'great cataloger'
    password = '[omitted]'

    updated_cataloger = perform({
      id: @admin.id,
      name: name,
      email: email,
      password: password,
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
    name = 'Bill Brown'
    email = 'bill.brown@example.com'
    description = 'awesome cataloger'
    password = '[something]'

    updated_cataloger = perform({
      id: @non_admin.id,
      name: name,
      email: email,
      password: password,
      description: description,
    }, @admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.id, @non_admin.id
    assert_equal updated_cataloger.name, name
    assert_equal updated_cataloger.email, email
    assert_equal updated_cataloger.description, description
    assert_equal updated_cataloger.updated_by, @admin
  end

  test 'non-admin cataloger updating him/herself' do
    name = 'Bob Smith'
    email = 'bob.smit@example.com'
    description = 'super cataloger'
    password = '[something]'

    updated_cataloger = perform({
      id: @non_admin.id,
      name: name,
      email: email,
      password: password,
      description: description,
    }, @non_admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.id, @non_admin.id
    assert_equal updated_cataloger.name, name
    assert_equal updated_cataloger.email, email
    assert_equal updated_cataloger.description, description
    assert_equal updated_cataloger.updated_by, @non_admin
  end

  test 'error if non-admin cataloger attempts to update other cataloger' do
    name = 'Wilma Flintstone'
    email = 'wilma.flintstone@example.com'
    description = 'best cataloger'
    password = '[stuff]'

    assert_raises GraphQL::ExecutionError do
      perform({
        id: @admin.id,
        name: name,
        email: email,
      password: password,
        description: description,
      }, @non_admin)
    end
  end

  test 'non-admin cataloger cannot make self an admin' do
    old_cataloger = @non_admin

    updated_cataloger = perform({
      id: old_cataloger.id,
      admin: true,
      name: old_cataloger.name,
      email: old_cataloger.email,
      password: old_cataloger.password,
      description: old_cataloger.description,
    }, @non_admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.admin, false
    assert_equal updated_cataloger.id, old_cataloger.id
    assert_equal updated_cataloger.name, old_cataloger.name
    assert_equal updated_cataloger.email, old_cataloger.email
    assert_equal updated_cataloger.description, old_cataloger.description
  end

  test 'admin cataloger can make other cataloger an admin' do
    old_cataloger = @non_admin

    updated_cataloger = perform({
      id: old_cataloger.id,
      admin: true,
      name: old_cataloger.name,
      email: old_cataloger.email,
      password: old_cataloger.password,
      description: old_cataloger.description,
    }, @admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.admin, true
    assert_equal updated_cataloger.id, old_cataloger.id
    assert_equal updated_cataloger.name, old_cataloger.name
    assert_equal updated_cataloger.email, old_cataloger.email
    assert_equal updated_cataloger.description, old_cataloger.description
  end

  # TODO: test admin/non-admin updating admin status of a cataloger
end
