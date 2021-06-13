if Rails.env.development?
  GraphiQL::Rails.config.headers['Authorization'] = ->(_ctx) {
    # need an admin cataloger in DB to create a token for GraphiQL
    "Bearer #{AuthToken.token(Cataloger.find_by(admin: true))}"
  }
end
