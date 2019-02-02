class UserMailer < ApplicationMailer
  def welcome_email
    @user = params[:user]
    @url  = 'https://c2m2-dev.herokuapp.com/sign-in'
    mail(to: @user.email, subject: 'Welcome to C2M2 Test')
  end
end
