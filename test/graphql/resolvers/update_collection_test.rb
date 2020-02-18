require 'test_helper'

class Resolvers::UpdateCollectionTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateCollection.new.call(
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
    @repository = Repository.create!(
      name: 'Parent Repo',
      location: 'Boulder, CO',
      created_by: @cataloger,
    )
    @collection = Collection.create!(
      name: 'Collection',
      finding_aid_link: 'http://www.collection.com',
      repository_id: @repository.id,
      created_by: @cataloger,
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )
  end

  test 'updating a collection' do
    name = 'Great Collection'
    description = 'Super great'
    finding_aid_link = 'http://www.greatcollection.com'

    updated_collection = perform(
      id: @collection.id,
      name: name,
      finding_aid_link: finding_aid_link,
      description: description,
      repository_id: @repository.id,
    )

    assert updated_collection.persisted?
    assert_equal updated_collection.id, @collection.id
    assert_equal updated_collection.name, name
    assert_equal updated_collection.finding_aid_link, finding_aid_link
    assert_equal updated_collection.description, description
    assert_equal updated_collection.repository, @repository
    assert_equal updated_collection.created_by, @cataloger
    assert_equal updated_collection.updated_by, @new_cataloger
  end
end
