class UserMailer < ApplicationMailer
  def welcome_email(user)
    @user = user
    @url = 'https://c2m2-dev.herokuapp.com/request-reset-password'
    mail(to: @user.email, subject: 'Welcome to C2M2 Dev')
  end

  def reset_password_token_email(user, token)
    @user = user
    @url = "https://c2m2-dev.herokuapp.com/reset-password/#{token}"
    mail(to: @user.email, subject: 'Password Reset for C2M2 Dev')
  end
end
