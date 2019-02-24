require 'test_helper'

class Resolvers::UpdateCatalogerTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateCataloger.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
  end

  test 'cataloger updating him/herself' do
    name = 'Jane Doe'
    email = 'jane.doe@example.com'
    description = 'great cataloger'
    password = '[omitted]'

    updated_cataloger = perform(
      id: @cataloger.id,
      name: name,
      authProvider: {
        email: {
          email: email,
          password: password,
        }
      },
      description: description,
    )

    assert updated_cataloger.persisted?
    assert_equal updated_cataloger.id, @cataloger.id
    assert_equal updated_cataloger.name, name
    assert_equal updated_cataloger.email, email
    assert_equal updated_cataloger.description, description
    assert_equal updated_cataloger.created_by, @cataloger
  end
end
