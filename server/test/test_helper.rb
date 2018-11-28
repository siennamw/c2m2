ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'

class ActiveSupport::TestCase
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
  def get_signed_in_user
    password = 'password'
    cataloger = Cataloger.create!(
      name: 'Test Cataloger',
      email: 'cataloger@test.com',
      password: password
    )

    signInCataloger(email: { email: cataloger.email, password: password})
  end
end
