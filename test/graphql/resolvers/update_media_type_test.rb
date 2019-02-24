require 'test_helper'

class Resolvers::UpdateMediaTypeTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateMediaType.new.call(nil, args, { current_user: @new_cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @media_type = MediaType.create!(
      name: 'old media type',
      description: 'pretty cool media type',
      cataloger: @cataloger
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )
  end

  test 'updating a media type' do
    name = 'new media type'
    description = 'awesome media type'

    updated_media_type = perform(
      id: @media_type.id,
      name: name,
      description: description,
    )

    assert updated_media_type.persisted?
    assert_equal updated_media_type.id, @media_type.id
    assert_equal updated_media_type.name, name
    assert_equal updated_media_type.description, description
    assert_equal updated_media_type.cataloger, @new_cataloger
  end
end
