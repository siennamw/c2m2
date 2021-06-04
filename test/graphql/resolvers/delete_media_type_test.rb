require 'test_helper'

class Resolvers::DeleteMediaTypeTest < ActiveSupport::TestCase
  def perform(args = {}, current_user = @new_cataloger)
    Resolvers::DeleteMediaType.new.call(
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

    @media_type = MediaType.create!(
      name: 'MediaType 1',
      created_by: @cataloger,
    )
    @media_type2 = MediaType.create!(
      name: 'MediaType 2',
      created_by: @cataloger,
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

  test 'unauthenticated user attempting to delete a media_type' do
    assert_raises GraphQL::ExecutionError do
      result = perform({ id: @media_type.id }, nil)
      assert_equal 'Authentication required', result.message
    end

    assert MediaType.exists?(@media_type.id), true
  end

  test 'deleting a media_type without works' do
    result = perform(id: @media_type.id)
    assert result, true
    assert_raises ActiveRecord::RecordNotFound do
      MediaType.find(@media_type.id)
    end
  end

  test 'creates the expected Event' do
    event_count = Event.count
    perform(id: @media_type2.id)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: @media_type2.id)

    # event record
    assert_equal @new_cataloger, event.created_by
    assert_equal 'DeleteMediaType', event.name
    assert_equal @media_type2.id, event.entity_id

    # event payload
    assert_empty event.payload
  end

  test 'attempting to delete a media_type with works fails and returns expected error' do
    assert_raises GraphQL::ExecutionError do
      result = perform(id: @media_type_with_works.id)
      assert_equal 'Invalid input: Record has associated works and cannot be deleted', result.message
      assert MediaType.exists?(@media_type_with_works.id), true
    end
  end
end
