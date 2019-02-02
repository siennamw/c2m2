# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def welcome_email
    # http://localhost:3000/rails/mailers/user_mailer/welcome_email.html
    UserMailer.with(user: Cataloger.first).welcome_email
  end
end
