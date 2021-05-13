require 'test_helper'

class Resolvers::ToggleDeleteCollectionTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::ToggleDeleteCollection.new.call(
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
      name: 'Parent Repo 1',
      location: 'Boulder, CO',
      created_by: @cataloger,
    )
    @collection = Collection.create!(
      name: 'Collection 1',
      finding_aid_link: 'http://www.collection.com',
      repository_id: @repository.id,
      created_by: @cataloger,
    )
    @deleted_collection = Collection.create!(
      name: 'Deleted Collection 1',
      finding_aid_link: 'http://www.collection.com',
      repository_id: @repository.id,
      created_by: @cataloger,
      deleted: true,
    )

    @collection_with_resources = Collection.create!(
      name: 'another collection 3',
      finding_aid_link: 'http://www.collection2.com',
      repository: @repository,
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
    Resource.create!(
      work: work,
      material_format: material_format,
      collections: [@collection_with_resources],
      created_by: @cataloger,
    )
  end

  test 'deleting a collection without resources' do
    result = perform(
      id: @collection.id,
    )

    assert_equal result.deleted, true
    assert_equal result.updated_by, @new_cataloger
  end

  test 'un-deleting a deleted collection' do
    result = perform(
      id: @deleted_collection.id,
    )

    assert_equal result.deleted, false
    assert_equal result.updated_by, @new_cataloger
  end

  test 'attempting to delete a collection with resources fails and returns expected error' do
    result = perform(
      id: @collection_with_resources.id,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Record has associated resources and cannot be deleted', result.message

    collection_after = Collection.find(@collection_with_resources.id)
    assert_equal collection_after.deleted, false
    assert_nil collection_after.updated_by
  end
end
