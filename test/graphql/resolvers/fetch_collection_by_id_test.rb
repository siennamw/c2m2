require 'test_helper'

class Resolvers::FetchCollectionByIdTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::FetchCollectionById.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    )
    @repository = Repository.create!(
      name: 'a repository',
      location: 'Boulder, CO',
      created_by: @cataloger,
    )
    @collection = Collection.create!(
      created_by: @cataloger,
      name: 'name',
      repository: @repository,
    )
    @deleted_collection = Collection.create!(
      created_by: @cataloger,
      name: 'deleted',
      repository: @repository,
      deleted: true,
    )
  end

  test 'returns expected record if not deleted' do
    result = find(id: @collection.id)
    assert_equal @collection, result
  end

  test 'if user not authenticated and record is deleted, raises RecordNotFound error' do
    assert_raises ActiveRecord::RecordNotFound do
      find(id: @deleted_collection.id)
    end
  end

  test 'if user authenticated, returns expected record even if deleted' do
    result = find({ id: @deleted_collection.id }, @cataloger)
    assert_equal @deleted_collection, result
  end
end
