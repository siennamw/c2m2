require 'test_helper'

class Resolvers::DeleteDirectorTest < ActiveSupport::TestCase
  def perform(args = {}, current_user = @new_cataloger)
    Resolvers::DeleteDirector.new.call(
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

    @director = Director.create!(
      name: 'Director 1',
      created_by: @cataloger,
    )
    @director2 = Director.create!(
      name: 'Director 2',
      created_by: @cataloger,
    )
    @director_with_works = Director.create!(
      name: 'Director with work',
      created_by: @cataloger,
    )

    media_type = MediaType.create!(
      name: 'another media type 1',
      created_by: @cataloger,
    )
    Work.create!(
      title: 'work 1',
      year: 1998,
      directors: [@director_with_works],
      media_type: media_type,
      created_by: @cataloger,
    )
  end

  test 'unauthenticated user attempting to delete a director' do
    assert_raises GraphQL::ExecutionError do
      result = perform({ id: @director.id }, nil)
      assert_equal 'Authentication required', result.message
    end

    assert Director.exists?(@director.id), true
  end

  test 'deleting a director without works' do
    result = perform(id: @director.id)
    assert result, true
    assert_raises ActiveRecord::RecordNotFound do
      Director.find(@director.id)
    end
  end

  test 'creates the expected Event' do
    event_count = Event.count
    perform(id: @director2.id)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: @director2.id)

    # event record
    assert_equal @new_cataloger, event.created_by
    assert_equal 'DeleteDirector', event.name
    assert_equal @director2.id, event.entity_id

    # event payload
    assert_empty event.payload
  end

  test 'attempting to delete a director with works fails and returns expected error' do
    assert_raises GraphQL::ExecutionError do
      result = perform(id: @director_with_works.id)
      assert_equal 'Invalid input: Record has associated works and cannot be deleted', result.message
      assert Director.exists?(@director_with_works.id), true
    end
  end
end
