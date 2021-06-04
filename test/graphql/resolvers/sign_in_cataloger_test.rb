require 'test_helper'

class Resolvers::SignInCatalogerTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::SignInCataloger.new.call(nil, args, { cookies: {}, session: {} })
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
  end

  test 'creates a token' do
    result = perform(
      email: @cataloger.email,
      password: @cataloger.password
    )

    assert result.present?
    assert result.token.present?
    assert_equal result.cataloger, @cataloger
  end

  test 'handling no credentials' do
    assert_nil perform
  end

  test 'handling wrong email' do
    assert_nil perform(email: 'wrong')
  end

  test 'handling wrong password' do
    assert_nil perform(email: @cataloger.email, password: 'wrong')
  end
end
