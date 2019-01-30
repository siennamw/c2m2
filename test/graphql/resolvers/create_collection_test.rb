require 'test_helper'

class Resolvers::CreateCollectionTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateCollection.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')
    @repository = Repository.create!(name: 'Parent Repo', location: 'Boulder, CO', cataloger: @cataloger)
  end

  test 'creating new collection' do
    name = 'Great Collection'
    description = 'Super great'

    collection = perform(
      name: name,
      description: description,
      repository_id: @repository.id,
    )

    assert collection.persisted?
    assert_equal collection.name, name
    assert_equal collection.description, description
    assert_equal collection.repository, @repository
    assert_equal collection.cataloger, @cataloger
  end
end
