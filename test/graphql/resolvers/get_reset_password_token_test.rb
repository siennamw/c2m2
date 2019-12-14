require 'test_helper'

class Resolvers::GetResetPasswordTokenTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::GetResetPasswordToken.new.call(nil, args, {})
  end

  setup do
    @cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')
  end

  test 'returns true even if cataloger does not exist' do
    result = perform(
      email: 'does.not.exist@test.com',
    )

    assert result.equal?(true)
  end

  test 'sets reset_password_token' do
    assert_not @cataloger.reset_password_token.present?

    result = perform(
      email: @cataloger.email,
    )

    updated_cataloger = Cataloger.find_by(email: @cataloger.email)

    assert result.equal?(true)
    assert updated_cataloger.reset_password_token.present?
  end

  test 'sets reset_password_token_expires_at' do
    assert_not @cataloger.reset_password_token_expires_at.present?

    result = perform(
      email: @cataloger.email,
    )

    updated_cataloger = Cataloger.find_by(email: @cataloger.email)

    assert result.equal?(true)
    assert updated_cataloger.reset_password_token_expires_at.present?
  end
end
