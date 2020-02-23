require 'test_helper'

class Resolvers::UpdateMediaTypeTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::UpdateMediaType.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @admin = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test',
      admin: true
    )
    @admin2 = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2',
      admin: true,
    )
    @non_admin = Cataloger.create!(
      name: 'non-admin',
      email: 'non.admin@email.com',
      password: 'test_test'
    )
    @media_type = MediaType.create!(
      name: 'old media type',
      description: 'pretty cool media type',
      created_by: @admin
    )
  end

  test 'updating a media type' do
    name = 'new media type'
    description = 'awesome media type'

    updated_media_type = perform({
      id: @media_type.id,
      name: name,
      description: description,
    }, @admin2)

    assert updated_media_type.persisted?
    assert_equal updated_media_type.id, @media_type.id
    assert_equal updated_media_type.name, name
    assert_equal updated_media_type.description, description
    assert_equal updated_media_type.created_by, @admin
    assert_equal updated_media_type.updated_by, @admin2
  end

  test 'non-admin cannot update a media type' do
    name = 'better media type'
    description = 'best media type'

    assert_raises GraphQL::ExecutionError do
      perform({
        id: @media_type.id,
        name: name,
        description: description,
      }, @non_admin)
    end
  end
end
