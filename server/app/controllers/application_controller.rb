class ApplicationController < ActionController::Base
  # TODO: temporary for development
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session
end
