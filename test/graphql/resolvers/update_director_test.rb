require 'test_helper'

class Resolvers::UpdateDirectorTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateDirector.new.call(nil, args, { current_user: @new_cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    @director = Director.create!(
      name: 'Steven Spielberg',
      imdb_link: 'example.com/spielberg',
      created_by: @cataloger
    )
    @new_cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
  end

  test 'updating a director' do
    name = 'Alfred Hitchcock'
    imdb_link = 'example.com/hitchcock'

    updated_director = perform(
      id: @director.id,
      name: name,
      imdb_link: imdb_link,
    )

    assert updated_director.persisted?
    assert_equal updated_director.id, @director.id
    assert_equal updated_director.name, name
    assert_equal updated_director.imdb_link, imdb_link
    assert_equal updated_director.created_by, @cataloger
    assert_equal updated_director.updated_by, @new_cataloger
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'John Krasinski'
    imdb_link = 'example.com/krasinski'

    record = perform(
      id: @director.id,
      name: name,
      imdb_link: imdb_link,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.updated_by, event.created_by
    assert_equal 'UpdateDirector', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal event_payload.keys.sort, %w[imdb_link name]
    assert_equal record.name, event_payload['name']
    assert_equal record.imdb_link, event_payload['imdb_link']
  end
end
