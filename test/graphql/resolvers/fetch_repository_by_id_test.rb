require 'test_helper'

class Resolvers::FetchRepositoryByIdTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::FetchRepositoryById.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    )
    @repository = Repository.create!(
      created_by: @cataloger,
      location: 'Paris, France',
      name: 'name',
    )
    @deleted_repository = Repository.create!(
      created_by: @cataloger,
      location: 'Paris, France',
      name: 'deleted',
      deleted: true,
    )
  end

  test 'returns expected record if not deleted' do
    result = find(id: @repository.id)
    assert_equal @repository, result
  end

  test 'if user not authenticated and record is deleted, raises RecordNotFound error' do
    assert_raises ActiveRecord::RecordNotFound do
      find(id: @deleted_repository.id)
    end
  end

  test 'if user authenticated, returns expected record even if deleted' do
    result = find({ id: @deleted_repository.id }, @cataloger)
    assert_equal @deleted_repository, result
  end
end
