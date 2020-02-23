require 'test_helper'

class Resolvers::CreateMaterialFormatTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::CreateMaterialFormat.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @admin = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test',
      admin: true
    )
    @non_admin = Cataloger.create!(
      name: 'non-admin',
      email: 'non.admin@email.com',
      password: 'test_test'
    )
  end

  test 'creating new material format' do
    name = 'new material format'
    description = 'awesome material format'

    material_format = perform({
      name: name,
      description: description,
    }, @admin)

    assert material_format.persisted?
    assert_equal material_format.name, name
    assert_equal material_format.description, description
    assert_equal material_format.created_by, @admin
  end

  test 'non-admin cannot create a material format' do
    name = 'better material format'
    description = 'best material format'

    assert_raises GraphQL::ExecutionError do
      perform({
        name: name,
        description: description,
      }, @non_admin)
    end
  end
end
