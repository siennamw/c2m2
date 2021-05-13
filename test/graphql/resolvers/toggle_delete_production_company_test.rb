require 'test_helper'

class Resolvers::ToggleDeleteProductionCompanyTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::ToggleDeleteProductionCompany.new.call(
      nil,
      args,
      { current_user: @new_cataloger }
    )
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@email.com',
      password: 'test_test'
    )
    @new_cataloger = Cataloger.create!(
      name: 'test2',
      email: 'test2@email.com',
      password: 'test_test2'
    )

    @production_company = ProductionCompany.create!(
      name: 'ProductionCompany 1',
      created_by: @cataloger,
    )
    @deleted_production_company = ProductionCompany.create!(
      name: 'Deleted ProductionCompany 1',
      created_by: @cataloger,
      deleted: true,
    )
    @production_company_with_works = ProductionCompany.create!(
      name: 'ProductionCompany with work',
      created_by: @cataloger,
    )

    media_type = MediaType.create!(
      name: 'MediaType 1',
      created_by: @cataloger,
    )
    Work.create!(
      title: 'work 1',
      year: 1998,
      production_companies: [@production_company_with_works],
      media_type: media_type,
      created_by: @cataloger,
    )
  end

  test 'deleting a production_company without works' do
    result = perform(
      id: @production_company.id,
    )

    assert_equal result.deleted, true
    assert_equal result.updated_by, @new_cataloger
  end

  test 'un-deleting a deleted production_company' do
    result = perform(
      id: @deleted_production_company.id,
    )

    assert_equal result.deleted, false
    assert_equal result.updated_by, @new_cataloger
  end

  test 'attempting to delete a production_company with works fails and returns expected error' do
    result = perform(
      id: @production_company_with_works.id,
    )

    assert_instance_of GraphQL::ExecutionError, result
    assert_equal 'Invalid input: Record has associated works and cannot be deleted', result.message

    assert_equal ProductionCompany.find(@production_company_with_works.id).deleted, false
  end
end
