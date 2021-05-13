require 'test_helper'

class Resolvers::ToggleDeleteResourceTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::ToggleDeleteResource.new.call(
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
    material_format = MaterialFormat.create!(
      name: 'another material format 1',
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

    @resource = Resource.create!(
      material_format: material_format,
      collections: [collection],
      work: work,
      created_by: @cataloger,
    )
    @deleted_resource = Resource.create!(
      material_format: material_format,
      collections: [collection],
      work: work,
      created_by: @cataloger,
      deleted: true,
    )
  end

  test 'deleting a resource' do
    result = perform(
      id: @resource.id,
    )

    assert_equal result.deleted, true
    assert_equal result.updated_by, @new_cataloger
  end

  test 'un-deleting a deleted resource' do
    result = perform(
      id: @deleted_resource.id,
    )

    assert_equal result.deleted, false
    assert_equal result.updated_by, @new_cataloger
  end
end
