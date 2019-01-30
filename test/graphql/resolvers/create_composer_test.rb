require 'test_helper'

class Resolvers::CreateComposerTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateComposer.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')
  end

  test 'creating new composer' do
    name = 'Claude Debussy'
    imdb_link = 'example.com/debussy'

    composer = perform(
      name: name,
      imdb_link: imdb_link,
    )

    assert composer.persisted?
    assert_equal composer.name, name
    assert_equal composer.imdb_link, imdb_link
    assert_equal composer.cataloger, @cataloger
  end
end
