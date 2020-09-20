# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def welcome_email
    # http://localhost:3000/rails/mailers/user_mailer/welcome_email.html
    cataloger = Cataloger.first || { email: 'example@preview.com' }
    UserMailer.welcome_email(cataloger)
  end

  def reset_password_token_email
    # http://localhost:3000/rails/mailers/user_mailer/reset_password_token_email.html
    cataloger = Cataloger.first || { email: 'example@preview.com' }
    UserMailer.reset_password_token_email(cataloger, 'token0123')
  end

  def info_change_email
    # http://localhost:3000/rails/mailers/user_mailer/info_change_email.html
    cataloger = Cataloger.first || { email: 'example@preview.com' }
    UserMailer.info_change_email(cataloger, false)
  end

  def info_change_email_admin
    # http://localhost:3000/rails/mailers/user_mailer/info_change_email_admin.html
    cataloger = Cataloger.first || { email: 'example@preview.com' }
    UserMailer.info_change_email(cataloger, true)
  end
end
