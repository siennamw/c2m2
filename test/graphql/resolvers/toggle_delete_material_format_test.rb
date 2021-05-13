require 'test_helper'

class Resolvers::ToggleDeleteMaterialFormatTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::ToggleDeleteMaterialFormat.new.call(
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

    @material_format = MaterialFormat.create!(
      name: 'MaterialFormat 1',
      created_by: @cataloger,
    )
    @deleted_material_format = MaterialFormat.create!(
      name: 'Deleted MaterialFormat 1',
      created_by: @cataloger,
      deleted: true,
    )
    @material_format_with_resources = MaterialFormat.create!(
      name: 'MaterialFormat with work',
      created_by: @cataloger,
    )

    media_type = MediaType.create!(
      name: 'another media type 1',
      created_by: @cataloger,
    )
    work = Work.create!(
      title: 'work 1',
      year: 1998,
      media_type: media_type,
      created_by: @cataloger,
    )
    repository = Repository.create!(
      name: 'Parent Repo 1',
      location: 'Boulder, CO',
      created_by: @cataloger,
    )
    collection = Collection.create!(
      name: 'Collection 1',
      finding_aid_link: 'http://www.collection.com',
      repository: repository,
      created_by: @cataloger,
    )
    Resource.create!(
      work: work,
      material_format: @material_format_with_resources,
      collections: [collection],
      created_by: @cataloger,
    )
  end

  test 'deleting a material_format without works' do
    result = perform(
      id: @material_format.id,
    )

    assert_equal result.deleted, true
    assert_equal result.updated_by, @new_cataloger
  end

  test 'un-deleting a deleted material_format' do
    result = perform(
      id: @deleted_material_format.id,
    )

    assert_equal result.deleted, false
    assert_equal result.updated_by, @new_cataloger
  end

  test 'attempting to delete a material_format with resources fails and returns expected error' do
    result = perform(
      id: @material_format_with_resources.id,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Record has associated resources and cannot be deleted', result.message

    assert_equal MaterialFormat.find(@material_format_with_resources.id).deleted, false
  end
end
