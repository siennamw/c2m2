require 'test_helper'

class Resolvers::UpdateCountryTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateCountry.new.call(nil, args, { current_user: @new_cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @country = Country.create!(
      name: 'Chile',
      description: 'lots of coast',
      cataloger: @cataloger
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )
  end

  test 'updating a country' do
    name = 'Namibia'
    description = 'Home of the Namib desert'

    updated_country = perform(
      id: @country.id,
      name: name,
      description: description,
    )

    assert updated_country.persisted?
    assert_equal updated_country.id, @country.id
    assert_equal updated_country.name, name
    assert_equal updated_country.description, description
    assert_equal updated_country.cataloger, @new_cataloger
  end
end
