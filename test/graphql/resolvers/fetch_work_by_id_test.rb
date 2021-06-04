require 'test_helper'

class Resolvers::FetchWorkByIdTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::FetchWorkById.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    media_type = MediaType.create!(name: 'a media type', created_by: @cataloger)
    @work = Work.create!(
      title: 'a film',
      media_type: media_type,
      year: 1990,
      created_by: @cataloger,
    )
  end

  test 'returns expected record' do
    result = find(id: @work.id)
    assert_equal @work, result
  end

  test 'if no matching record, returns GraphQL::ExecutionError error with expected message' do
    result = find(id: 'nonsense')
    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Entry not found', result.message
  end
end
