require 'test_helper'

class Resolvers::FetchCatalogerByIdTest < ActiveSupport::TestCase
  def find(args = {}, current_user = nil)
    Resolvers::FetchCatalogerById.new.call(nil, args, { current_user: current_user })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: 'test',
      email: 'test@example.com',
      password: '12345678',
    )
  end

  test 'returns expected record' do
    result = find(id: @cataloger.id)
    assert_equal @cataloger, result
  end
end
