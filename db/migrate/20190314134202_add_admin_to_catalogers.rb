class AddAdminToCatalogers < ActiveRecord::Migration[5.1]
  def change
    add_column :catalogers, :admin, :boolean, null: false, default: false
    add_index :catalogers, :admin
  end
end
