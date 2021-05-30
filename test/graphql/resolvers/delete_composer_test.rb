require 'test_helper'

class Resolvers::DeleteComposerTest < ActiveSupport::TestCase
  def perform(args = {}, current_user = @new_cataloger)
    Resolvers::DeleteComposer.new.call(
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

    @composer = Composer.create!(
      name: 'Composer 1',
      created_by: @cataloger,
    )
    @composer2 = Composer.create!(
      name: 'Composer 2',
      created_by: @cataloger,
    )
    @composer_with_works = Composer.create!(
      name: 'Composer with work',
      created_by: @cataloger,
    )
    @composer_with_works_as_orch = Composer.create!(
      name: 'Composer with work as orchestrator',
      created_by: @cataloger,
    )

    media_type = MediaType.create!(
      name: 'another media type 1',
      created_by: @cataloger,
    )
    Work.create!(
      title: 'work 1',
      year: 1998,
      composers: [@composer_with_works],
      orchestrators: [@composer_with_works_as_orch],
      media_type: media_type,
      created_by: @cataloger,
    )
  end

  test 'unauthenticated user attempting to delete a composer' do
    assert_raises GraphQL::ExecutionError do
      result = perform({ id: @composer.id }, nil)
      assert_equal 'Authentication required', result.message
    end

    assert Composer.exists?(@composer.id), true
  end

  test 'deleting a composer without works' do
    result = perform(id: @composer.id)
    assert result, true
    assert_raises ActiveRecord::RecordNotFound do
      Composer.find(@composer.id)
    end
  end

  test 'creates the expected Event' do
    event_count = Event.count
    perform(id: @composer2.id)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: @composer2.id)

    # event record
    assert_equal @new_cataloger, event.created_by
    assert_equal 'DeleteComposer', event.name
    assert_equal @composer2.id, event.entity_id

    # event payload
    assert_empty event.payload
  end

  test 'attempting to delete a composer with works fails and returns expected error' do
    assert_raises GraphQL::ExecutionError do
      result = perform(id: @composer_with_works.id)
      assert_equal 'Invalid input: Record has associated works and cannot be deleted', result.message
      assert Composer.exists?(@composer_with_works.id), true
    end
  end

  test 'attempting to delete a composer with works as orchestrator fails and returns expected error' do
    assert_raises GraphQL::ExecutionError do
      result = perform(id: @composer_with_works_as_orch.id)
      assert_equal 'Invalid input: Record has associated works and cannot be deleted', result.message
      assert Composer.exists?(@composer_with_works_as_orch.id), true
    end
  end
end
