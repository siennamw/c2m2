class AddResetPasswordFields < ActiveRecord::Migration[5.1]
  def change
    add_column :catalogers, :reset_password_token, :string, default: nil
    add_column :catalogers, :reset_password_token_expires_at, :datetime, default: nil
  end
end
