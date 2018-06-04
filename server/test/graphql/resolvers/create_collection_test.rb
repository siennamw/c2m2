require 'test_helper'

class Resolvers::CreateCollectionTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateCollection.new.call(nil, args, {})
  end

  test 'creating new collection' do
    # create a parent repository
    repo_args = { name: 'Parent Repo', location: 'Boulder, CO' }
    Resolvers::CreateRepository.new.call(nil, repo_args, {})

    # create a collection
    name = 'Great Collection'
    description = 'Super great'
    repository_id = Repository.first.id

    collection = perform(
      name: name,
      description: description,
      repository_id: repository_id,
    )

    assert collection.persisted?
    assert_equal collection.name, name
    assert_equal collection.description, description
    assert_equal collection.repository.id, repository_id
  end
end
