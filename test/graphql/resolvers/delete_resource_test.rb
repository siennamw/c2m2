require 'test_helper'

class Resolvers::DeleteResourceTest < ActiveSupport::TestCase
  def perform(args = {}, current_user = @new_cataloger)
    Resolvers::DeleteResource.new.call(
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
    @resource2 = Resource.create!(
      material_format: material_format,
      collections: [collection],
      work: work,
      created_by: @cataloger,
    )
  end

  test 'unauthenticated user attempting to delete a resource' do
    assert_raises GraphQL::ExecutionError do
      result = perform({ id: @resource.id }, nil)
      assert_equal 'Authentication required', result.message
    end

    assert Resource.exists?(@resource.id), true
  end

  test 'creates the expected Event' do
    event_count = Event.count
    perform(id: @resource2.id)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: @resource2.id)

    # event record
    assert_equal @new_cataloger, event.created_by
    assert_equal 'DeleteResource', event.name
    assert_equal @resource2.id, event.entity_id

    # event payload
    assert_empty event.payload
  end

  test 'deleting a resource' do
    result = perform(id: @resource.id)
    assert result, true
    assert_raises ActiveRecord::RecordNotFound do
      Resource.find(@resource.id)
    end
  end
end
