require 'test_helper'

class Resolvers::CreateCollectionTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateCollection.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    @repository = Repository.create!(name: 'Parent Repo', location: 'Boulder, CO', created_by: @cataloger)
  end

  test 'creating new collection' do
    name = 'Great Collection'
    description = 'Super great'
    finding_aid_link = 'http://www.greatcollection.com'

    collection = perform(
      name: name,
      finding_aid_link: finding_aid_link,
      description: description,
      repository_id: @repository.id,
    )

    assert collection.persisted?
    assert_not_empty collection.id
    assert_equal collection.name, name
    assert_equal collection.finding_aid_link, finding_aid_link
    assert_equal collection.description, description
    assert_equal collection.repository, @repository
    assert_equal collection.created_by, @cataloger
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'Fantastic Collection'
    description = 'Super great'
    finding_aid_link = 'http://www.fantasticcollection.com'

    record = perform(
      name: name,
      finding_aid_link: finding_aid_link,
      description: description,
      repository_id: @repository.id,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.created_by, event.created_by
    assert_equal 'CreateCollection', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal record.name, event_payload['name']
    assert_equal record.finding_aid_link, event_payload['finding_aid_link']
    assert_equal record.description, event_payload['description']
    assert_equal record.repository_id, event_payload['repository_id']
  end

  test 'creating new collection with predetermined ID' do
    name = 'Another Collection'
    description = 'Fantastic'
    finding_aid_link = 'http://www.greatcollection.com'
    id = SecureRandom.uuid

    collection = perform(
      id: id,
      name: name,
      finding_aid_link: finding_aid_link,
      description: description,
      repository_id: @repository.id,
    )

    assert collection.persisted?
    assert_equal collection.id, id
    assert_equal collection.name, name
    assert_equal collection.finding_aid_link, finding_aid_link
    assert_equal collection.description, description
    assert_equal collection.repository, @repository
    assert_equal collection.created_by, @cataloger
  end

  test 'duplicate name returns expected error' do
    name = 'Collection Djfgiuhewmpbeo'

    perform(
      name: name,
      repository_id: @repository.id,
    )

    result = perform(
      name: name,
      repository_id: @repository.id,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Name has already been taken', result.message
  end
end
