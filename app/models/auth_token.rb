class AuthToken
  def self.key
    Rails.application.secrets.secret_key_base
  end

  def self.token(cataloger)
    time = Time.new
    payload = {
      id: cataloger.id,
      admin: cataloger.admin,
      exp: time.at_end_of_day.to_i, # expire just before midnight
    }
    JsonWebToken.sign(payload, key: key)
  end

  def self.verify(token)
    result = JwtClaims.verify(token, key: key)
    return nil unless result[:ok][:exp] # reject if exp claim is missing
    return nil if result[:error]
    Cataloger.find_by(id: result[:ok][:id])
  end
end
