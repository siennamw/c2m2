require 'test_helper'

class Resolvers::CreateMediaTypeTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateMediaType.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')
  end

  test 'creating new media type' do
    name = 'new material type'
    description = 'awesome material type'

    media_type = perform(
      name: name,
      description: description,
    )

    assert media_type.persisted?
    assert_equal media_type.name, name
    assert_equal media_type.description, description
    assert_equal media_type.created_by, @cataloger
  end
end
