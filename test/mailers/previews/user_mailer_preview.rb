# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview
  def welcome_email
    # http://localhost:3000/rails/mailers/user_mailer/welcome_email.html
    cataloger = Cataloger.first

    unless cataloger
      cataloger = { email: 'example@preview.com' }
    end

    UserMailer.welcome_email(cataloger)
  end

  def reset_password_token_email
    # http://localhost:3000/rails/mailers/user_mailer/reset_password_token_email.html
    cataloger = Cataloger.first

    unless cataloger
      cataloger = { email: 'example@preview.com' }
    end

    UserMailer.reset_password_token_email(cataloger, 'token0123')
  end
end
