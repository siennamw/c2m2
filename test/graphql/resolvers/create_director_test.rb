require 'test_helper'

class Resolvers::CreateDirectorTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateDirector.new.call(nil, args, { current_user: 'nobody' })
  end

  test 'creating new director' do
    name = 'Alfred Hitchcock'
    imdb_link = 'example.com/hitchcock'

    director = perform(
    name: name,
    imdb_link: imdb_link,
    )

    assert director.persisted?
    assert_equal director.name, name
    assert_equal director.imdb_link, imdb_link
  end
end
