require 'test_helper'

class Resolvers::CreateCollectionTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateCollection.new.call(nil, args, {})
  end

  setup do
    @repository = Repository.create!(name: 'Parent Repo', location: 'Boulder, CO')
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
  end
end
