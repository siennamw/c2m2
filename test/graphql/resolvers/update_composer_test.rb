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
      cataloger: @cataloger
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
    assert_equal composer.cataloger, @new_cataloger
  end
end
