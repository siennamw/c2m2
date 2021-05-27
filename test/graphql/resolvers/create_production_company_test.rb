require 'test_helper'

class Resolvers::CreateProductionCompanyTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateProductionCompany.new.call(nil, args, { current_user: @cataloger })
  end

  setup do
    @cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')
  end

  test 'creating new production company' do
    name = 'Prod Co'
    contact_info = 'prodco.com'

    production_co = perform(
      name: name,
      contact_info: contact_info,
    )

    assert production_co.persisted?
    assert_not_empty production_co.id
    assert_equal production_co.name, name
    assert_equal production_co.contact_info, contact_info
    assert_equal production_co.created_by, @cataloger
  end

  test 'creating new production company with predetermined ID' do
    name = 'Prod Co Inc'
    contact_info = 'prodcoinc.com'
    id = SecureRandom.uuid

    production_co = perform(
      id: id,
      name: name,
      contact_info: contact_info,
    )

    assert production_co.persisted?
    assert_equal production_co.id, id
    assert_equal production_co.name, name
    assert_equal production_co.contact_info, contact_info
    assert_equal production_co.created_by, @cataloger
  end

  test 'duplicate name returns expected error' do
    name = 'Production Co Rvfiuhmlqwekdkjn'

    perform(
      name: name,
    )

    result = perform(
      name: name,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Name has already been taken', result.message
  end
end
