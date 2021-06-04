require 'test_helper'

class Resolvers::DeleteRepositoryTest < ActiveSupport::TestCase
  def perform(args = {}, current_user = @new_cataloger)
    Resolvers::DeleteRepository.new.call(
      nil,
      args,
      { current_user: current_user }
    )
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    @new_cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )

    @repository = Repository.create!(
      name: 'Repository 1',
      location: 'here',
      created_by: @cataloger,
    )
    @repository2 = Repository.create!(
      name: 'Repository 2',
      location: 'here',
      created_by: @cataloger,
    )
    @repository_with_collections = Repository.create!(
      name: 'Repository with collection',
      location: 'here',
      created_by: @cataloger,
    )

    Collection.create!(
      name: 'MediaType 1',
      repository: @repository_with_collections,
      created_by: @cataloger,
    )
  end

  test 'unauthenticated user attempting to delete a repository' do
    assert_raises GraphQL::ExecutionError do
      result = perform({ id: @repository.id }, nil)
      assert_equal 'Authentication required', result.message
    end

    assert Repository.exists?(@repository.id), true
  end

  test 'deleting a repository without collections' do
    result = perform(id: @repository.id)
    assert result, true
    assert_raises ActiveRecord::RecordNotFound do
      Repository.find(@repository.id)
    end
  end

  test 'creates the expected Event' do
    event_count = Event.count
    perform(id: @repository2.id)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: @repository2.id)

    # event record
    assert_equal @new_cataloger, event.created_by
    assert_equal 'DeleteRepository', event.name
    assert_equal @repository2.id, event.entity_id

    # event payload
    assert_empty event.payload
  end

  test 'attempting to delete a repository with collections fails and returns expected error' do
    assert_raises GraphQL::ExecutionError do
      result = perform(id: @repository_with_collections.id)
      assert_equal 'Invalid input: Record has associated collections and cannot be deleted', result.message
      assert Repository.exists?(@repository_with_collections.id), true
    end
  end
end
