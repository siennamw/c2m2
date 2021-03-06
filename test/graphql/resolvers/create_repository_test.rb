require 'test_helper'

class Resolvers::CreateRepositoryTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateRepository.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')
  end

  test 'creating new repository' do
    name = 'Repo'
    location = 'Boulder, CO'
    website = 'repo.com'

    repository = perform(
      name: name,
      location: location,
      website: website,
    )

    assert repository.persisted?
    assert_equal repository.name, name
    assert_equal repository.location, location
    assert_equal repository.website, website
    assert_equal repository.created_by, @cataloger
  end
end
