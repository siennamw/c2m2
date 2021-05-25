require 'test_helper'

class Resolvers::FetchCollectionByIdTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::FetchCollectionById.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    )
    @repository = Repository.create!(
      name: 'a repository',
      location: 'Boulder, CO',
      created_by: @cataloger,
    )
    @collection = Collection.create!(
      created_by: @cataloger,
      name: 'name',
      repository: @repository,
    )
  end

  test 'returns expected record' do
    result = find(id: @collection.id)
    assert_equal @collection, result
  end

  test 'if no matching record, returns GraphQL::ExecutionError error with expected message' do
    result = find(id: 'nonsense')
    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Entry not found', result.message
  end
end
