require 'test_helper'

class Resolvers::ToggleDeleteRepositoryTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::ToggleDeleteRepository.new.call(
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

    @repository = Repository.create!(
      name: 'Repository 1',
      location: 'here',
      created_by: @cataloger,
    )
    @deleted_repository = Repository.create!(
      name: 'Deleted Repository 1',
      location: 'here',
      created_by: @cataloger,
      deleted: true,
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

  test 'deleting a repository without collections' do
    result = perform(
      id: @repository.id,
    )

    assert_equal result.deleted, true
    assert_equal result.updated_by, @new_cataloger
  end

  test 'un-deleting a deleted repository' do
    result = perform(
      id: @deleted_repository.id,
    )

    assert_equal result.deleted, false
    assert_equal result.updated_by, @new_cataloger
  end

  test 'attempting to delete a repository with collections fails and returns expected error' do
    result = perform(
      id: @repository_with_collections.id,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Record has associated collections and cannot be deleted', result.message

    assert_equal Repository.find(@repository_with_collections.id).deleted, false
  end
end
