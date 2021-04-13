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
    assert_equal composer.created_by, @cataloger
  end

  test 'duplicate imdb_link returns expected error' do
    imdb_link = 'https://www.imdb.com/name/nm0461360/'

    perform(
      name: 'Mark Knopfler',
      imdb_link: imdb_link,
    )

    result = perform(
      name: 'Not Mark Knopfler',
      imdb_link: imdb_link,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Imdb link has already been taken', result.message
  end

  test 'query params are stripped from imdb_link' do
    imdb_link = 'https://www.imdb.com/name/nm0002354/?ref_=fn_al_nm_1'
    name = 'John Williams'

    composer = perform(
      name: name,
      imdb_link: imdb_link,
    )

    assert composer.persisted?
    assert_equal 'https://www.imdb.com/name/nm0002354/', composer.imdb_link
  end
end
