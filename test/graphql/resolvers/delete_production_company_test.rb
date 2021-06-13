require 'test_helper'

class Resolvers::DeleteProductionCompanyTest < ActiveSupport::TestCase
  def perform(args = {}, current_user = @new_cataloger)
    Resolvers::DeleteProductionCompany.new.call(
      nil,
      args,
      { current_user: current_user }
    )
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
    @new_cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )

    @production_company = ProductionCompany.create!(
      name: 'ProductionCompany 1',
      created_by: @cataloger,
    )
    @production_company2 = ProductionCompany.create!(
      name: 'ProductionCompany 2',
      created_by: @cataloger,
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
      production_companies: [@production_company_with_works],
      media_type: media_type,
      created_by: @cataloger,
    )
  end

  test 'unauthenticated user attempting to delete a production company' do
    assert_raises GraphQL::ExecutionError do
      result = perform({ id: @production_company.id }, nil)
      assert_equal 'Authentication required', result.message
    end

    assert ProductionCompany.exists?(@production_company.id), true
  end

  test 'deleting a production company without works' do
    result = perform(id: @production_company.id)
    assert result, true
    assert_raises ActiveRecord::RecordNotFound do
      ProductionCompany.find(@production_company.id)
    end
  end

  test 'creates the expected Event' do
    event_count = Event.count
    perform(id: @production_company2.id)

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: @production_company2.id)

    # event record
    assert_equal @new_cataloger, event.created_by
    assert_equal 'DeleteProductionCompany', event.name
    assert_equal @production_company2.id, event.entity_id

    # event payload
    assert_empty event.payload
  end

  test 'attempting to delete a production company with works fails and returns expected error' do
    assert_raises GraphQL::ExecutionError do
      result = perform(id: @production_company_with_works.id)
      assert_equal 'Invalid input: Record has associated works and cannot be deleted', result.message
      assert ProductionCompany.exists?(@production_company_with_works.id), true
    end
  end
end
