require 'test_helper'

class UserMailerTest < ActionMailer::TestCase
  setup do
    @cataloger = Cataloger.create!(name: 'test', email: 'test@email.com', password: 'test_test')
  end

  def test_welcome_email
    # Send the email, then test that it got queued
    email = UserMailer.welcome_email(@cataloger).deliver
    assert !ActionMailer::Base.deliveries.empty?

    # Test the body of the sent email contains what we expect it to
    assert_equal [@cataloger.email], email.to
    assert_equal 'Welcome to C2M2', email.subject

    # TODO: implement more tests when email body is finalized
    # assert_match(/<h1>Welcome to example.com, #{user.name}<\/h1>/, email.encoded)
    # assert_match(/Welcome to example.com, #{user.name}/, email.encoded)
  end
end
