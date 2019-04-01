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
    )

    @non_admin = Cataloger.create!(
      name: 'non-admin',
      email: 'non-admin@email.com',
      password: 'test-test',
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
      authProvider: {
        email: {
          email: email,
          password: password,
        }
      },
      description: description,
    }, @admin)

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.id, @admin.id
    assert_equal updated_cataloger.name, name
    assert_equal updated_cataloger.email, email
    assert_equal updated_cataloger.description, description
    assert_equal updated_cataloger.created_by, @admin
  end

  test 'non-admin cataloger cannot update other cataloger' do
    assert_raises GraphQL::ExecutionError do
      perform({}, @non_admin)
    end
  end
end
