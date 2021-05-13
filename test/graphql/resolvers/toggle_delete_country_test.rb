require 'test_helper'

class Resolvers::ToggleDeleteCountryTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::ToggleDeleteCountry.new.call(
      nil,
      args,
      { current_user: @new_cataloger }
    )
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )

    @country = Country.create!(
      name: 'Country 1',
      created_by: @cataloger,
    )
    @deleted_country = Country.create!(
      name: 'Deleted Country 1',
      created_by: @cataloger,
      deleted: true,
    )
    @country_with_works = Country.create!(
      name: 'Country with work',
      created_by: @cataloger,
    )

    media_type = MediaType.create!(
      name: 'another media type 1',
      created_by: @cataloger,
    )
    Work.create!(
      title: 'work 1',
      year: 1998,
      country: @country_with_works,
      media_type: media_type,
      created_by: @cataloger,
    )
  end

  test 'deleting a country without works' do
    result = perform(
      id: @country.id,
    )

    assert_equal result.deleted, true
    assert_equal result.updated_by, @new_cataloger
  end

  test 'un-deleting a deleted country' do
    result = perform(
      id: @deleted_country.id,
    )

    assert_equal result.deleted, false
    assert_equal result.updated_by, @new_cataloger
  end

  test 'attempting to delete a country with works fails and returns expected error' do
    result = perform(
      id: @country_with_works.id,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Record has associated works and cannot be deleted', result.message

    assert_equal Country.find(@country_with_works.id).deleted, false
  end
end
