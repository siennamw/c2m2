require 'test_helper'

class Resolvers::UpdateDirectorTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateDirector.new.call(nil, args, { current_user: @new_cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @director = Director.create!(
      name: 'Steven Spielberg',
      imdb_link: 'example.com/spielberg',
      created_by: @cataloger
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
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
end
