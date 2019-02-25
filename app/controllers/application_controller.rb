class ApplicationController < ActionController::Base
  # TODO: this is temporary for development
  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  def fallback_index_html
    render :file => 'public/index.html'
  end
end
