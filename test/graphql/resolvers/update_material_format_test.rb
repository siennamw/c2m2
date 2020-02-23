require 'test_helper'

class Resolvers::UpdateMaterialFormatTest < ActiveSupport::TestCase
  def perform(args = {}, current_user)
    Resolvers::UpdateMaterialFormat.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @admin = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test',
      admin: true,
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
    @material_format = MaterialFormat.create!(
      name: 'old material format',
      description: 'pretty cool material format',
      created_by: @admin
    )
  end

  test 'updating a material format' do
    name = 'new material format'
    description = 'awesome material format'

    updated_material_format = perform({
      id: @material_format.id,
      name: name,
      description: description,
    }, @admin2)

    assert updated_material_format.persisted?
    assert_equal updated_material_format.id, @material_format.id
    assert_equal updated_material_format.name, name
    assert_equal updated_material_format.description, description
    assert_equal updated_material_format.created_by, @admin
    assert_equal updated_material_format.updated_by, @admin2
  end

  test 'non-admin cannot update a material format' do
    name = 'better material format'
    description = 'best material format'

    assert_raises GraphQL::ExecutionError do
      perform({
        id: @material_format.id,
        name: name,
        description: description,
      }, @non_admin)
    end
  end
end
