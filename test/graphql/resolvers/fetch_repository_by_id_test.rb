require 'test_helper'

class Resolvers::FetchRepositoryByIdTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::FetchRepositoryById.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    @repository = Repository.create!(
      created_by: @cataloger,
      location: 'Paris, France',
      name: 'name',
    )
  end

  test 'returns expected record' do
    result = find(id: @repository.id)
    assert_equal @repository, result
  end

  test 'if no matching record, returns GraphQL::ExecutionError error with expected message' do
    result = find(id: 'nonsense')
    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Entry not found', result.message
  end
end
