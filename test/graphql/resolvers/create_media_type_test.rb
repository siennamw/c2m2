require 'test_helper'

class Resolvers::CreateMediaTypeTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::CreateMediaType.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @admin = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test',
      admin: true,
    )
    @non_admin = Cataloger.create!(
      name: 'non-admin',
      email: 'non.admin@email.com',
      password: 'test_test'
    )
  end

  test 'creating new media type' do
    name = 'new media type'
    description = 'awesome media type'

    media_type = perform({
      name: name,
      description: description,
    }, @admin)

    assert media_type.persisted?
    assert_not_empty media_type.id
    assert_equal media_type.name, name
    assert_equal media_type.description, description
    assert_equal media_type.created_by, @admin
  end

  test 'creating new media type with predetermined ID' do
    name = 'another media type'
    description = 'great media type'
    id = SecureRandom.uuid

    media_type = perform({
      id: id,
      name: name,
      description: description,
    }, @admin)

    assert media_type.persisted?
    assert_equal media_type.id, id
    assert_equal media_type.name, name
    assert_equal media_type.description, description
    assert_equal media_type.created_by, @admin
  end

  test 'non-admin cannot create a media type' do
    name = 'better media type'
    description = 'best media type'

    assert_raises GraphQL::ExecutionError do
      perform({
        name: name,
        description: description,
      }, @non_admin)
    end
  end
end
