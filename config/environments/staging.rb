require_relative './production'

Rails.application.configure do
  # Disable email delivery in staging
  # (alternatively, could use https://mailtrap.io/)
  # TODO: deliveries enabled temporarily for testing; reset to false when done
  config.action_mailer.perform_deliveries = true
end
