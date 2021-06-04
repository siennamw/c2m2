require 'test_helper'

class Resolvers::DeleteMaterialFormatTest < ActiveSupport::TestCase
  def perform(args = {}, current_user = @new_cataloger)
    Resolvers::DeleteMaterialFormat.new.call(
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

    @material_format = MaterialFormat.create!(
      name: 'MaterialFormat 1',
      created_by: @cataloger,
    )
    @material_format2 = MaterialFormat.create!(
      name: 'MaterialFormat 2',
      created_by: @cataloger,
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

  test 'unauthenticated user attempting to delete a material format' do
    assert_raises GraphQL::ExecutionError do
      result = perform({ id: @material_format.id }, nil)
      assert_equal 'Authentication required', result.message
    end

    assert MaterialFormat.exists?(@material_format.id), true
  end

  test 'deleting a material format without resources' do
    result = perform(id: @material_format.id)
    assert result, true
    assert_raises ActiveRecord::RecordNotFound do
      MaterialFormat.find(@material_format.id)
    end
  end

  test 'creates the expected Event' do
    event_count = Event.count
    perform(id: @material_format2.id)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: @material_format2.id)

    # event record
    assert_equal @new_cataloger, event.created_by
    assert_equal 'DeleteMaterialFormat', event.name
    assert_equal @material_format2.id, event.entity_id

    # event payload
    assert_empty event.payload
  end

  test 'attempting to delete a material format with resources fails and returns expected error' do
    assert_raises GraphQL::ExecutionError do
      result = perform(id: @material_format_with_resources.id)
      assert_equal 'Invalid input: Record has associated resources and cannot be deleted', result.message
      assert MaterialFormat.exists?(@material_format_with_resources.id), true
    end
  end
end
