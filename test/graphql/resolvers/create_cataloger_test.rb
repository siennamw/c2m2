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
