require 'test_helper'

class Resolvers::ToggleDeleteDirectorTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::ToggleDeleteDirector.new.call(
      nil,
      args,
      { current_user: @new_cataloger }
    )
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )

    @director = Director.create!(
      name: 'Director 1',
      created_by: @cataloger,
    )
    @deleted_director = Director.create!(
      name: 'Deleted Director 1',
      created_by: @cataloger,
      deleted: true,
    )
    @director_with_works = Director.create!(
      name: 'Director with work',
      created_by: @cataloger,
    )

    media_type = MediaType.create!(
      name: 'another media type 1',
      created_by: @cataloger,
    )
    Work.create!(
      title: 'work 1',
      year: 1998,
      directors: [@director_with_works],
      media_type: media_type,
      created_by: @cataloger,
    )
  end

  test 'deleting a director without works' do
    result = perform(
      id: @director.id,
    )

    assert_equal result.deleted, true
    assert_equal result.updated_by, @new_cataloger
  end

  test 'un-deleting a deleted director' do
    result = perform(
      id: @deleted_director.id,
    )

    assert_equal result.deleted, false
    assert_equal result.updated_by, @new_cataloger
  end

  test 'attempting to delete a director with works fails and returns expected error' do
    result = perform(
      id: @director_with_works.id,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Record has associated works and cannot be deleted', result.message

    assert_equal Director.find(@director_with_works.id).deleted, false
  end
end
