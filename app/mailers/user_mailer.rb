class UserMailer < ApplicationMailer
  def welcome_email(user)
    base_url = ENV['DOMAIN'] ? "https://#{ENV['DOMAIN']}" : "http://localhost:3001"
    @user = user
    @url = "#{base_url}/request-reset-password"
    mail(to: @user.email, subject: 'Welcome to C2M2')
  end

  def reset_password_token_email(user, token)
    base_url = ENV['DOMAIN'] ? "https://#{ENV['DOMAIN']}" : "http://localhost:3001"
    @user = user
    @url = "#{base_url}/reset-password/#{token}"
    mail(to: @user.email, subject: 'Password Reset for C2M2')
  end
end
