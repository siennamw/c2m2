class RemoveSoftDeleteField < ActiveRecord::Migration[6.1]
  def change
    remove_column :collections, :deleted
    remove_column :composers, :deleted
    remove_column :countries, :deleted
    remove_column :directors, :deleted
    remove_column :material_formats, :deleted
    remove_column :media_types, :deleted
    remove_column :production_companies, :deleted
    remove_column :repositories, :deleted
    remove_column :resources, :deleted
    remove_column :works, :deleted
  end
end
