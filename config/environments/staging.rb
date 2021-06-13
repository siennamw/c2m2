require_relative './production'

Rails.application.configure do
  # Disable email delivery in staging
  # (alternatively, could use https://mailtrap.io/)
  config.action_mailer.perform_deliveries = false
end
