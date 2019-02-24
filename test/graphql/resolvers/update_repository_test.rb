require 'test_helper'

class Resolvers::UpdateRepositoryTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateRepository.new.call(nil, args, { current_user: @new_cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @repository = Repository.create!(
      name: 'a repository',
      location: 'Memphis, TN',
      website: 'repository.org',
      cataloger: @cataloger
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )
  end

  test 'updating a repository' do
    name = 'Repo'
    location = 'Boulder, CO'
    website = 'repo.com'

    updated_repository = perform(
      id: @repository.id,
      name: name,
      location: location,
      website: website,
    )

    assert updated_repository.persisted?
    assert_equal updated_repository.id, @repository.id
    assert_equal updated_repository.name, name
    assert_equal updated_repository.location, location
    assert_equal updated_repository.website, website
    assert_equal updated_repository.cataloger, @new_cataloger
  end
end
