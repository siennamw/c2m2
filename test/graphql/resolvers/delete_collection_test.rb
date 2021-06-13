require 'test_helper'

class Resolvers::DeleteCollectionTest < ActiveSupport::TestCase
  def perform(args = {}, current_user = @new_cataloger)
    Resolvers::DeleteCollection.new.call(
      nil,
      args,
      { current_user: current_user }
    )
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    @new_cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
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
    @collection2 = Collection.create!(
      name: 'Collection 2',
      finding_aid_link: 'http://www.collection.com',
      repository_id: @repository.id,
      created_by: @cataloger,
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

  test 'unauthenticated user attempting to delete a collection' do
    assert_raises GraphQL::ExecutionError do
      result = perform({ id: @collection.id }, nil)
      assert_equal 'Authentication required', result.message
    end

    assert Collection.exists?(@collection.id), true
  end

  test 'deleting a collection without resources' do
    result = perform(id: @collection.id)
    assert result, true
    assert_raises ActiveRecord::RecordNotFound do
      Collection.find(@collection.id)
    end
  end

  test 'creates the expected Event' do
    event_count = Event.count
    perform(id: @collection2.id)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: @collection2.id)

    # event record
    assert_equal @new_cataloger, event.created_by
    assert_equal 'DeleteCollection', event.name
    assert_equal @collection2.id, event.entity_id

    # event payload
    assert_empty event.payload
  end

  test 'attempting to delete a collection with resources fails and returns expected error' do
    assert_raises GraphQL::ExecutionError do
      result = perform(id: @collection_with_resources.id)
      assert_equal 'Invalid input: Record has associated resources and cannot be deleted', result.message
      assert Collection.exists?(@collection_with_resources.id), true
    end
  end
end
