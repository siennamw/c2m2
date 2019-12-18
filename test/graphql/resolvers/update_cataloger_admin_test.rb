require 'test_helper'

class Resolvers::UpdateCatalogerAdminTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::UpdateCatalogerAdmin.new.call(nil, args, { current_user: current_user })
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

  test 'non-admin cataloger cannot update a cataloger' do
    assert_raises GraphQL::ExecutionError do
      perform({
        id: @admin.id,
        email: 'new@email.com',
        name: 'New Name',
      }, @non_admin)
    end
  end

  test 'admin cataloger updating him/herself' do
    name = 'Jane Doe'
    email = 'jane.doe@example.com'
    description = 'great cataloger'

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
    name = 'Bill Brown'
    email = 'bill.brown@example.com'
    description = 'awesome cataloger'

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
      password: 'new-password',
      admin: true,
    }, @admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.password_digest, @non_admin.password_digest
  end
end
