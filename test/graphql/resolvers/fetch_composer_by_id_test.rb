require 'test_helper'

class Resolvers::FetchComposerByIdTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::FetchComposerById.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    )
    @composer = Composer.create!(
      created_by: @cataloger,
      name: 'name',
    )
    @deleted_composer = Composer.create!(
      created_by: @cataloger,
      name: 'deleted',
      deleted: true,
    )
  end

  test 'returns expected record if not deleted' do
    result = find(id: @composer.id)
    assert_equal @composer, result
  end

  test 'if user not authenticated and record is deleted, raises RecordNotFound error' do
    assert_raises ActiveRecord::RecordNotFound do
      find(id: @deleted_composer.id)
    end
  end

  test 'if user authenticated, returns expected record even if deleted' do
    result = find({ id: @deleted_composer.id }, @cataloger)
    assert_equal @deleted_composer, result
  end
end
