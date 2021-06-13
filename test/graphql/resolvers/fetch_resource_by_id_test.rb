require 'test_helper'

class Resolvers::FetchResourceByIdTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::FetchResourceById.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    media_type = MediaType.create!(name: 'a media type', created_by: @cataloger)
    work = Work.create!(
      title: 'a film',
      media_type: media_type,
      year_start: 1990,
      created_by: @cataloger,
    )
    material_format = MaterialFormat.create!(
      name: 'material format',
      created_by: @cataloger,
    )

    @resource = Resource.create!(
      created_by: @cataloger,
      material_format: material_format,
      publication_status: 'approved',
      work: work,
    )
    @draft_resource = Resource.create!(
      created_by: @cataloger,
      material_format: material_format,
      publication_status: 'draft',
      work: work,
    )
  end

  test 'returns expected record if not draft' do
    result = find(id: @resource.id)
    assert_equal @resource, result
  end

  test 'if user not authenticated and record is draft, returns GraphQL::ExecutionError error with expected message' do
    result = find(id: @draft_resource.id)
    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Entry not found', result.message
  end

  test 'if no matching record, returns GraphQL::ExecutionError error with expected message' do
    result = find(id: 'nonsense')
    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Entry not found', result.message
  end
end
