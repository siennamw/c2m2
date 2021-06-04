require 'test_helper'

class Resolvers::UpdateCollectionTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateCollection.new.call(
      nil,
      args,
      { current_user: @new_cataloger }
    )
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    @repository = Repository.create!(
      name: 'Parent Repo',
      location: 'Boulder, CO',
      created_by: @cataloger,
    )
    @new_repository = Repository.create!(
      name: 'Another Parent Repo',
      location: 'Boulder, CO',
      created_by: @cataloger,
    )
    @collection = Collection.create!(
      name: 'Collection',
      finding_aid_link: 'http://www.collection.com',
      repository_id: @repository.id,
      created_by: @cataloger,
    )
    @new_cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
  end

  test 'updating a collection' do
    name = 'Great Collection'
    description = 'Super great'
    finding_aid_link = 'http://www.greatcollection.com'

    updated_collection = perform(
      id: @collection.id,
      name: name,
      finding_aid_link: finding_aid_link,
      description: description,
      repository_id: @new_repository.id,
    )

    assert updated_collection.persisted?
    assert_equal updated_collection.id, @collection.id
    assert_equal updated_collection.name, name
    assert_equal updated_collection.finding_aid_link, finding_aid_link
    assert_equal updated_collection.description, description
    assert_equal updated_collection.repository, @new_repository
    assert_equal updated_collection.created_by, @cataloger
    assert_equal updated_collection.updated_by, @new_cataloger
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'New Great Collection'
    description = 'Really great'
    finding_aid_link = 'http://www.greatcollection.com'

    record = perform(
      id: @collection.id,
      name: name,
      finding_aid_link: finding_aid_link,
      description: description,
      repository_id: @repository.id,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.updated_by, event.created_by
    assert_equal 'UpdateCollection', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal event_payload.keys.sort, %w[description finding_aid_link name repository_id]
    assert_equal record.name, event_payload['name']
    assert_equal record.finding_aid_link, event_payload['finding_aid_link']
    assert_equal record.description, event_payload['description']
    assert_equal record.repository_id, event_payload['repository_id']
  end
end
