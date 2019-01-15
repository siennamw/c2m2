require 'test_helper'

class Resolvers::CreateCatalogerTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateCataloger.new.call(nil, args, { current_user: 'nobody' })
  end

  test 'creating new cataloger' do
    name = 'Jane Doe'
    email = 'jane.doe@example.com'
    description = 'great cataloger'
    password = '[omitted]'

    cataloger = perform(
      name: name,
      authProvider: {
        email: {
          email: email,
          password: password,
        }
      },
      description: description,
    )

    assert cataloger.persisted?
    assert_equal cataloger.name, name
    assert_equal cataloger.email, email
    assert_equal cataloger.description, description
  end
end
