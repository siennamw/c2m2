class ApplicationController < ActionController::Base
  # because we're using JWTs in auth headers on each request from the client,
  # no further protection from CSRF attacks is needed
  protect_from_forgery with: :null_session

  def fallback_index_html
    render :file => 'public/index.html'
  end

  def robots
    robots = File.read("#{Rails.root}/config/robots.#{Rails.env}.txt")
    render plain: robots
  end
end
