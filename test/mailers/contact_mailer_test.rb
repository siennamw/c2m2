require 'test_helper'

class ContactMailerTest < ActionMailer::TestCase
  def test_contact_email
    name = 'Test Name'
    email_address = 'test@test.com'
    message = 'Test message'

    # Send the email, then test that it got queued
    email = ContactMailer.contact_email(name, email_address, message).deliver
    assert !ActionMailer::Base.deliveries.empty?

    # Test the body of the sent email contains what we expect it to
    assert_equal [email_address], email.from
    assert_equal [ENV['CONTACT_TO_EMAIL']], email.to
    assert_equal 'Contact Form Submission from C2M2', email.subject

    # TODO: implement more tests when email body is finalized
    # assert_match(/<h1>Welcome to example.com, #{user.name}<\/h1>/, email.encoded)
    # assert_match(/Welcome to example.com, #{user.name}/, email.encoded)
  end

  def test_suggestion_email
    name = 'Test Name'
    email_address = 'test@test.com'
    fields = {
      field1: 'content1',
      field2: 'content2'
    }

    # Send the email, then test that it got queued
    email = ContactMailer.suggestion_email(name, email_address, fields).deliver
    assert !ActionMailer::Base.deliveries.empty?

    # Test the body of the sent email contains what we expect it to
    assert_equal [email_address], email.from
    assert_equal [ENV['CONTACT_TO_EMAIL']], email.to
    assert_equal 'Suggestion Form Submission from C2M2', email.subject

    fields.each_pair do |k, v|
      text_string = "#{k.capitalize}: #{v}\r\n"
      html_string = "<p>#{k.capitalize}: #{v}</p>"
      assert_match(text_string, email.encoded)
      assert_match(html_string, email.encoded)
    end

    # TODO: implement more tests when email body is finalized
    # assert_match(/<h1>Welcome to example.com, #{user.name}<\/h1>/, email.encoded)
    # assert_match(/Welcome to example.com, #{user.name}/, email.encoded)
  end
end
