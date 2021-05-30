require 'test_helper'

class Resolvers::DeleteCountryTest < ActiveSupport::TestCase
  def perform(args = {}, current_user = @new_cataloger)
    Resolvers::DeleteCountry.new.call(
      nil,
      args,
      { current_user: current_user }
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
    @country2 = Country.create!(
      name: 'Country 2',
      created_by: @cataloger,
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

  test 'unauthenticated user attempting to delete a country' do
    assert_raises GraphQL::ExecutionError do
      result = perform({ id: @country.id }, nil)
      assert_equal 'Authentication required', result.message
    end

    assert Country.exists?(@country.id), true
  end

  test 'deleting a country without works' do
    result = perform(id: @country.id)
    assert result, true
    assert_raises ActiveRecord::RecordNotFound do
      Country.find(@country.id)
    end
  end

  test 'creates the expected Event' do
    event_count = Event.count
    perform(id: @country2.id)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: @country2.id)

    # event record
    assert_equal @new_cataloger, event.created_by
    assert_equal 'DeleteCountry', event.name
    assert_equal @country2.id, event.entity_id

    # event payload
    assert_empty event.payload
  end

  test 'attempting to delete a country with works fails and returns expected error' do
    assert_raises GraphQL::ExecutionError do
      result = perform(id: @country_with_works.id)
      assert_equal 'Invalid input: Record has associated works and cannot be deleted', result.message
      assert Country.exists?(@country_with_works.id), true
    end
  end
end
