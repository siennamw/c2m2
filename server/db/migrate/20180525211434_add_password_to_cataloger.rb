class AddPasswordToCataloger < ActiveRecord::Migration[5.1]
  def change
    add_column :catalogers, :password_digest, :string
  end
end
