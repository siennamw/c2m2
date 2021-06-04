require 'test_helper'

class Resolvers::UpdateRepositoryTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateRepository.new.call(nil, args, { current_user: @new_cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    @repository = Repository.create!(
      name: 'a repository',
      location: 'Memphis, TN',
      website: 'repository.org',
      created_by: @cataloger
    )
    @new_cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
  end

  test 'updating a repository' do
    name = 'Repo'
    location = 'Boulder, CO'
    website = 'repo.com'

    updated_repository = perform(
      id: @repository.id,
      name: name,
      location: location,
      website: website,
    )

    assert updated_repository.persisted?
    assert_equal updated_repository.id, @repository.id
    assert_equal updated_repository.name, name
    assert_equal updated_repository.location, location
    assert_equal updated_repository.website, website
    assert_equal updated_repository.created_by, @cataloger
    assert_equal updated_repository.updated_by, @new_cataloger
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'Another Repo'
    location = 'Not Boulder, CO'
    website = 'anotherrepo.com'

    record = perform(
      id: @repository.id,
      name: name,
      location: location,
      website: website,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.updated_by, event.created_by
    assert_equal 'UpdateRepository', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal event_payload.keys.sort, %w[location name website]
    assert_equal record.name, event_payload['name']
    assert_equal record.location, event_payload['location']
    assert_equal record.website, event_payload['website']
  end
end
