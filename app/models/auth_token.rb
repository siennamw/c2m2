class AuthToken
  def self.key
    Rails.application.secrets.secret_key_base
  end

  def self.token(cataloger)
    payload = {user_id: cataloger.id}
    JsonWebToken.sign(payload, key: key)
  end

  def self.verify(token)
    result = JsonWebToken.verify(token, key: key)
    return nil if result[:error]
    Cataloger.find_by(id: result[:ok][:user_id])
  end
end
