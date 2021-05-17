require 'test_helper'

class Resolvers::FetchProductionCompanyByIdTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::FetchProductionCompanyById.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    )
    @production_company = ProductionCompany.create!(
      created_by: @cataloger,
      name: 'name',

    )
    @deleted_production_company = ProductionCompany.create!(
      created_by: @cataloger,
      name: 'deleted',
      deleted: true,
    )
  end

  test 'returns expected record if not deleted' do
    result = find(id: @production_company.id)
    assert_equal @production_company, result
  end

  test 'if user not authenticated and record is deleted, raises RecordNotFound error' do
    assert_raises ActiveRecord::RecordNotFound do
      find(id: @deleted_production_company.id)
    end
  end

  test 'if user authenticated, returns expected record even if deleted' do
    result = find({ id: @deleted_production_company.id }, @cataloger)
    assert_equal @deleted_production_company, result
  end
end
