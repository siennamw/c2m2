require 'test_helper'

class Resolvers::ToggleDeleteMediaTypeTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::ToggleDeleteMediaType.new.call(
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

    @media_type = MediaType.create!(
      name: 'MediaType 1',
      created_by: @cataloger,
    )
    @deleted_media_type = MediaType.create!(
      name: 'Deleted MediaType 1',
      created_by: @cataloger,
      deleted: true,
    )
    @media_type_with_works = MediaType.create!(
      name: 'MediaType with work',
      created_by: @cataloger,
    )

    Work.create!(
      title: 'work 1',
      year: 1998,
      media_type: @media_type_with_works,
      created_by: @cataloger,
    )
  end

  test 'deleting a media_type without works' do
    result = perform(
      id: @media_type.id,
    )

    assert_equal result.deleted, true
    assert_equal result.updated_by, @new_cataloger
  end

  test 'un-deleting a deleted media_type' do
    result = perform(
      id: @deleted_media_type.id,
    )

    assert_equal result.deleted, false
    assert_equal result.updated_by, @new_cataloger
  end

  test 'attempting to delete a media_type with works fails and returns expected error' do
    result = perform(
      id: @media_type_with_works.id,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Record has associated works and cannot be deleted', result.message

    assert_equal MediaType.find(@media_type_with_works.id).deleted, false
  end
end
