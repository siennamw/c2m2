class AddCatalogersToAll < ActiveRecord::Migration[5.1]
  def change
    add_reference :catalogers, :created_by, foreign_key: { to_table: :catalogers }
    add_reference :collections, :cataloger, foreign_key: true
    add_reference :composers, :cataloger, foreign_key: true
    add_reference :countries, :cataloger, foreign_key: true
    add_reference :directors, :cataloger, foreign_key: true
    add_reference :material_formats, :cataloger, foreign_key: true
    add_reference :media_types, :cataloger, foreign_key: true
    add_reference :production_companies, :cataloger, foreign_key: true
    add_reference :publishers, :cataloger, foreign_key: true
    add_reference :repositories, :cataloger, foreign_key: true
    add_foreign_key :works, :catalogers
  end
end
