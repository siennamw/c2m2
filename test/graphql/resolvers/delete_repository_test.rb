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
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )

    @repository = Repository.create!(
      name: 'Repository 1',
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

  test 'attempting to delete a repository with collections fails and returns expected error' do
    assert_raises GraphQL::ExecutionError do
      result = perform(id: @repository_with_collections.id)
      assert_equal 'Invalid input: Record has associated collections and cannot be deleted', result.message
      assert Repository.exists?(@repository_with_collections.id), true
    end
  end
end
