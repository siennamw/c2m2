class AddPublicationStatusToWorks < ActiveRecord::Migration[5.1]
  def change
    add_column :works, :publication_status, :string, null: false, default: 'draft'
    add_index :works, :publication_status
  end
end
