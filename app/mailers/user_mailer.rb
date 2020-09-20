class UserMailer < ApplicationMailer
  def welcome_email(user)
    base_url = ENV['DOMAIN'] ? "https://#{ENV['DOMAIN']}" : 'http://localhost:3001'
    @url = "#{base_url}/request-reset-password"
    mail(to: user.email, subject: 'Welcome to C2M2')
  end

  def reset_password_token_email(user, token)
    base_url = ENV['DOMAIN'] ? "https://#{ENV['DOMAIN']}" : 'http://localhost:3001'
    @url = "#{base_url}/reset-password/#{token}"
    mail(to: user.email, subject: 'Password Reset for C2M2')
  end

  def info_change_email(user, changed_by_admin)
    @changed_by_admin = changed_by_admin
    mail(to: user.email, subject: 'C2M2 Account Information Updated')
  end
end
