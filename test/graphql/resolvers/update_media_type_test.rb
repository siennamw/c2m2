require 'test_helper'

class Resolvers::UpdateMediaTypeTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::UpdateMediaType.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @admin = Cataloger.create!(
      admin: true,
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    @admin2 = Cataloger.create!(
      admin: true,
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    @non_admin = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    @media_type = MediaType.create!(
      name: 'old media type',
      description: 'pretty cool media type',
      created_by: @admin
    )
  end

  test 'updating a media type' do
    name = 'new media type'
    description = 'awesome media type'

    updated_media_type = perform({
      id: @media_type.id,
      name: name,
      description: description,
    }, @admin2)

    assert updated_media_type.persisted?
    assert_equal updated_media_type.id, @media_type.id
    assert_equal updated_media_type.name, name
    assert_equal updated_media_type.description, description
    assert_equal updated_media_type.created_by, @admin
    assert_equal updated_media_type.updated_by, @admin2
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'another new media type'
    description = 'another awesome media type'

    record = perform({
      id: @media_type.id,
      name: name,
      description: description,
    }, @admin2)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.updated_by, event.created_by
    assert_equal 'UpdateMediaType', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal event_payload.keys.sort, %w[description name]
    assert_equal record.name, event_payload['name']
    assert_equal record.description, event_payload['description']
  end

  test 'non-admin cannot update a media type' do
    name = 'better media type'
    description = 'best media type'

    assert_raises GraphQL::ExecutionError do
      perform({
        id: @media_type.id,
        name: name,
        description: description,
      }, @non_admin)
    end
  end
end
