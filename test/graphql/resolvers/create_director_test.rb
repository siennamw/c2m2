require 'test_helper'

class Resolvers::CreateDirectorTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateDirector.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
  end

  test 'creating new director' do
    name = 'Alfred Hitchcock'
    imdb_link = 'example.com/hitchcock'

    director = perform(
      name: name,
      imdb_link: imdb_link,
    )

    assert director.persisted?
    assert_not_empty director.id
    assert_equal director.name, name
    assert_equal director.imdb_link, imdb_link
    assert_equal director.created_by, @cataloger
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'Rob Reiner'
    imdb_link = 'example.com/reiner'

    record = perform(
      name: name,
      imdb_link: imdb_link,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.created_by, event.created_by
    assert_equal 'CreateDirector', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal record.name, event_payload['name']
    assert_equal record.imdb_link, event_payload['imdb_link']
  end

  test 'creating new director with predetermined ID' do
    name = 'Bruce Wayne'
    imdb_link = 'example.com/batman'
    id = SecureRandom.uuid

    director = perform(
      id: id,
      name: name,
      imdb_link: imdb_link,
    )

    assert director.persisted?
    assert_equal director.id, id
    assert_equal director.name, name
    assert_equal director.imdb_link, imdb_link
    assert_equal director.created_by, @cataloger
  end

  test 'duplicate name returns expected error' do
    perform(
      name: 'Clark Kent',
    )

    result = perform(
      name: 'Clark Kent',
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Name has already been taken', result.message
  end

  test 'duplicate imdb_link returns expected error' do
    imdb_link = 'https://www.imdb.com/name/nm0718645/'

    perform(
      name: 'Ivan Reitman',
      imdb_link: imdb_link,
    )

    result = perform(
      name: 'Not Ivan Reitman',
      imdb_link: imdb_link,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Imdb link has already been taken', result.message
  end

  test 'query params are stripped from imdb_link' do
    imdb_link = 'https://www.imdb.com/name/nm0898288/?ref_=tt_ov_dr'
    name = 'Denis Villeneuve'

    director = perform(
      name: name,
      imdb_link: imdb_link,
    )

    assert director.persisted?
    assert_equal 'https://www.imdb.com/name/nm0898288/', director.imdb_link
  end
end
