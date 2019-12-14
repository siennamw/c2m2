require 'test_helper'

class Resolvers::ResetPasswordTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::ResetPassword.new.call(nil, args, {})
  end

  setup do
    cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')
    Resolvers::GetResetPasswordToken.new.call(nil, {email: cataloger.email}, {})
    @cataloger = Cataloger.find_by(email: cataloger.email)
  end

  test 'returns false if cataloger does not exist' do
    result = perform(
      email: 'does.not.exist@test.com',
      reset_token: @cataloger.reset_password_token
    )

    assert result.equal?(false)
  end

  test 'returns false if token is invalid' do
    result = perform(
      email: @cataloger.email,
      reset_token: 'bad token'
    )

    assert result.equal?(false)
  end

  test 'returns true if user exists, token is valid, and new password is supplied' do
    result = perform(
      email: @cataloger.email,
      reset_token: @cataloger.reset_password_token,
      new_password: 'new_password'
    )

    assert result.equal?(true)
  end

  test 'returns false and does not change password if new password does not pass validation' do
    new_pwd = 'no' # too short

    result = perform(
      email: @cataloger.email,
      reset_token: @cataloger.reset_password_token,
      new_password: new_pwd
    )

    updated_cataloger = Cataloger.find_by(email: @cataloger.email)

    assert updated_cataloger.present?
    assert result.equal?(false)
    assert_not updated_cataloger.authenticate(new_pwd)
  end

  test 'changes password with valid email, token, and new password' do
    new_pwd = 'new_password2'

    result = perform(
      email: @cataloger.email,
      reset_token: @cataloger.reset_password_token,
      new_password: new_pwd
    )

    assert result.equal?(true)

    updated_cataloger = Cataloger.find_by(email: @cataloger.email)
    assert updated_cataloger.present?
    assert updated_cataloger.authenticate(new_pwd)
  end

  test 'clears reset token and its expiration date after success' do
    new_pwd = 'new_password3'

    result = perform(
      email: @cataloger.email,
      reset_token: @cataloger.reset_password_token,
      new_password: new_pwd
    )

    assert result.equal?(true)

    updated_cataloger = Cataloger.find_by(email: @cataloger.email)
    assert updated_cataloger.reset_password_token.equal?(nil)
    assert updated_cataloger.reset_password_token_expires_at.equal?(nil)
  end
end
