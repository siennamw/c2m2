class SoftDelete < ActiveRecord::Migration[6.1]
  def change
    add_column :collections, :deleted, :boolean, null: false, default: false
    add_index :collections, :deleted
    add_column :composers, :deleted, :boolean, null: false, default: false
    add_index :composers, :deleted
    add_column :countries, :deleted, :boolean, null: false, default: false
    add_index :countries, :deleted
    add_column :directors, :deleted, :boolean, null: false, default: false
    add_index :directors, :deleted
    add_column :material_formats, :deleted, :boolean, null: false, default: false
    add_index :material_formats, :deleted
    add_column :media_types, :deleted, :boolean, null: false, default: false
    add_index :media_types, :deleted
    add_column :production_companies, :deleted, :boolean, null: false, default: false
    add_index :production_companies, :deleted
    add_column :repositories, :deleted, :boolean, null: false, default: false
    add_index :repositories, :deleted
    add_column :resources, :deleted, :boolean, null: false, default: false
    add_index :resources, :deleted
    add_column :works, :deleted, :boolean, null: false, default: false
    add_index :works, :deleted
  end
end
