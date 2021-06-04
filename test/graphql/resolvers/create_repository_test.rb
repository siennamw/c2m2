require 'test_helper'

class Resolvers::CreateRepositoryTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateRepository.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
  end

  test 'creating new repository' do
    name = 'Repo'
    location = 'Boulder, CO'
    website = 'repo.com'

    repository = perform(
      name: name,
      location: location,
      website: website,
    )

    assert repository.persisted?
    assert_not_empty repository.id
    assert_equal repository.name, name
    assert_equal repository.location, location
    assert_equal repository.website, website
    assert_equal repository.created_by, @cataloger
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'uhwfeinjzsfmc'
    location = 'Nonesuch, CO'
    website = 'uhwfeinjzsfmc.com'

    record = perform(
      name: name,
      location: location,
      website: website,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.created_by, event.created_by
    assert_equal 'CreateRepository', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal record.name, event_payload['name']
    assert_equal record.location, event_payload['location']
    assert_equal record.website, event_payload['website']
  end

  test 'creating new repository with predetermined ID' do
    name = 'Another Repo'
    location = 'Boulder, CO'
    website = 'another-repo.com'
    id = SecureRandom.uuid

    repository = perform(
      id: id,
      name: name,
      location: location,
      website: website,
    )

    assert repository.persisted?
    assert_equal repository.id, id
    assert_equal repository.name, name
    assert_equal repository.location, location
    assert_equal repository.website, website
    assert_equal repository.created_by, @cataloger
  end

  test 'duplicate name returns expected error' do
    name = 'Repository Yihuwefbqyeganx'

    perform(
      name: name,
      location: 'Madagascar',
    )

    result = perform(
      name: name,
      location: 'Peru',
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Name has already been taken', result.message
  end
end
