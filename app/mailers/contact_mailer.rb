class ContactMailer < ApplicationMailer
  default to: ENV['GMAIL_USERNAME'], from: ENV['GMAIL_USERNAME']

  def contact_email(name, email, message)
    @name = name
    @email = email
    @message = message
    mail(reply_to: @email, subject: 'Contact Form Submission from C2M2')
  end

  def suggestion_email(name, email, fields)
    @name = name
    @email = email
    @fields = fields
    mail(reply_to: @email, subject: 'Suggestion Form Submission from C2M2')
  end
end
