require 'test_helper'

class Resolvers::CreateProductionCompanyTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::CreateProductionCompany.new.call(nil, args, {})
  end

  test 'creating new production company' do
    name = 'Prod Co'
    contact_info = 'prodco.com'

    production_co = perform(
    name: name,
    contact_info: contact_info,
    )

    assert production_co.persisted?
    assert_equal production_co.name, name
    assert_equal production_co.contact_info, contact_info
  end
end
