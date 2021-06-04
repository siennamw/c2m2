require 'test_helper'

class Resolvers::GetResetPasswordTokenTest < ActiveSupport::TestCase
  def perform(args = {})
    Resolvers::GetResetPasswordToken.new.call(nil, args, {})
  end

  setup do
    @cataloger = Cataloger.create!(
      name: Faker::Name.name,
      email: Faker::Internet.email,
    )
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

  test 'creates expected Event' do
    event_count = Event.count

    perform(
      email: @cataloger.email,
    )

    assert event_count + 1, Event.count

    event = Event.find_by(entity_id: @cataloger.id)
    event_payload = event.payload.to_h

    # event record
    assert_equal @cataloger, event.created_by
    assert_equal 'GetResetPasswordToken', event.name
    assert_equal @cataloger.id, event.entity_id

    # event payload
    assert_equal event_payload.keys.sort, %w[email]
    assert_equal @cataloger.email, event_payload['email']
  end
end
