require 'test_helper'

class Resolvers::CreateCountryTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateCountry.new.call(nil, args, {})
  end

  test 'creating new country' do
    name = 'Namibia'
    description = 'Home of the Namib desert'

    country = perform(
    name: name,
    description: description,
    )

    assert country.persisted?
    assert_equal country.name, name
    assert_equal country.description, description
  end
end
