require 'test_helper'

class Resolvers::ToggleDeleteComposerTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::ToggleDeleteComposer.new.call(
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

    @composer = Composer.create!(
      name: 'Composer 1',
      created_by: @cataloger,
    )
    @deleted_composer = Composer.create!(
      name: 'Deleted Composer 1',
      created_by: @cataloger,
      deleted: true,
    )
    @composer_with_works = Composer.create!(
      name: 'Composer with work',
      created_by: @cataloger,
    )
    @composer_with_works_as_orch = Composer.create!(
      name: 'Composer with work as orchestrator',
      created_by: @cataloger,
    )

    media_type = MediaType.create!(
      name: 'another media type 1',
      created_by: @cataloger,
    )
    Work.create!(
      title: 'work 1',
      year: 1998,
      composers: [@composer_with_works],
      orchestrators: [@composer_with_works_as_orch],
      media_type: media_type,
      created_by: @cataloger,
    )
  end

  test 'deleting a composer without works' do
    result = perform(
      id: @composer.id,
    )

    assert_equal result.deleted, true
    assert_equal result.updated_by, @new_cataloger
  end

  test 'un-deleting a deleted composer' do
    result = perform(
      id: @deleted_composer.id,
    )

    assert_equal result.deleted, false
    assert_equal result.updated_by, @new_cataloger
  end


  test 'attempting to delete a composer with works as composer fails and returns expected error' do
    result = perform(
      id: @composer_with_works.id,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Record has associated works and cannot be deleted', result.message

    assert_equal Composer.find(@composer_with_works.id).deleted, false
  end

  test 'attempting to delete a composer with works as orchestrator fails and returns expected error' do
    result = perform(
      id: @composer_with_works_as_orch.id,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Record has associated works and cannot be deleted', result.message

    assert_equal Composer.find(@composer_with_works_as_orch.id).deleted, false
  end
end
