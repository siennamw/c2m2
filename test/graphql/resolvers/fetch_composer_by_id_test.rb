require 'test_helper'

class Resolvers::FetchComposerByIdTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::FetchComposerById.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    @composer = Composer.create!(
      created_by: @cataloger,
      name: 'name',
    )
  end

  test 'returns expected record' do
    result = find(id: @composer.id)
    assert_equal @composer, result
  end

  test 'if no matching record, returns GraphQL::ExecutionError error with expected message' do
    result = find(id: 'nonsense')
    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Entry not found', result.message
  end
end
