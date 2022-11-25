# Load the Rails application.
require_relative 'application'

ActionMailer::Base.smtp_settings = {
  :user_name => ENV['GMAIL_USERNAME'],
  :password => ENV['GMAIL_PASSWORD'],
  :domain => ENV['DOMAIN'],
  :address => 'smtp.gmail.com',
  :port => 587,
  :authentication => :plain,
  :enable_starttls_auto => true
}

# Initialize the Rails application.
Rails.application.initialize!
