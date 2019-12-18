require 'test_helper'

class Resolvers::UpdateCatalogerSelfTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::UpdateCatalogerSelf.new.call(nil, args, { current_user: current_user })
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

  test 'non-admin cataloger cannot edit cataloger other than self' do
    assert_raises GraphQL::ExecutionError do
      perform({
        id: @admin.id,
        email: 'new@email.com',
        name: 'New Name',
      }, @non_admin)
    end
  end

  test 'admin cataloger cannot edit cataloger other than self' do
    assert_raises GraphQL::ExecutionError do
      perform({
        id: @non_admin.id,
        email: 'new@email.com',
        name: 'New Name',
      }, @admin)
    end
  end

  test 'admin cataloger updating him/herself' do
    name = 'Jane Doe'
    email = 'jane.doe@example.com'
    description = 'great cataloger'
    new_password = 'new_password'

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
    name = 'Bob Smith'
    email = 'bob.smit@example.com'
    description = 'super cataloger'
    new_password = 'new_password'

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

  test 'omitting new_password field means that password is not changed' do
    name = 'William Smith'

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
