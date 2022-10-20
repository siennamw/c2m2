class ContactMailer < ApplicationMailer
  default to: ENV['GMAIL_USERNAME']

  def contact_email(name, email, message)
    @name = name
    @email = email
    @message = message
    mail(from: @email, subject: 'Contact Form Submission from C2M2')
  end

  def suggestion_email(name, email, fields)
    @name = name
    @email = email
    @fields = fields
    mail(from: @email, subject: 'Suggestion Form Submission from C2M2')
  end
end
