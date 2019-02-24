require 'test_helper'

class Resolvers::UpdateMaterialFormatTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::UpdateMaterialFormat.new.call(nil, args, { current_user: @new_cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @material_format = MaterialFormat.create!(
      name: 'old material format',
      description: 'pretty cool material format',
      cataloger: @cataloger
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )
  end

  test 'updating a material format' do
    name = 'new material format'
    description = 'awesome material format'

    updated_material_format = perform(
      id: @material_format.id,
      name: name,
      description: description,
    )

    assert updated_material_format.persisted?
    assert_equal updated_material_format.id, @material_format.id
    assert_equal updated_material_format.name, name
    assert_equal updated_material_format.description, description
    assert_equal updated_material_format.cataloger, @new_cataloger
  end
end
