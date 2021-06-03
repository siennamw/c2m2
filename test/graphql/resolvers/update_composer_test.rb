require 'test_helper'

class Resolvers::UpdateComposerTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateComposer.new.call(nil, args, { current_user: @new_cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @composer = Composer.create!(
      name: 'a composer',
      imdb_link: 'example.com/composer',
      created_by: @cataloger
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )
  end

  test 'updating a composer' do
    name = 'Claude Debussy'
    imdb_link = 'example.com/debussy'

    composer = perform(
      id: @composer.id,
      name: name,
      imdb_link: imdb_link,
    )

    assert composer.persisted?
    assert_equal composer.id, @composer.id
    assert_equal composer.name, name
    assert_equal composer.imdb_link, imdb_link
    assert_equal composer.created_by, @cataloger
    assert_equal composer.updated_by, @new_cataloger
  end

  test 'creates expected Event' do
    event_count = Event.count
    name = 'Ludwig van Beethoven'
    imdb_link = 'example.com/beethoven'

    record = perform(
      id: @composer.id,
      name: name,
      imdb_link: imdb_link,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: record.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal record.updated_by, event.created_by
    assert_equal 'UpdateComposer', event.name
    assert_equal record.id, event.entity_id

    # event payload
    assert_equal event_payload.keys.sort, %w[imdb_link name]
    assert_equal record.name, event_payload['name']
    assert_equal record.imdb_link, event_payload['imdb_link']
  end
end
