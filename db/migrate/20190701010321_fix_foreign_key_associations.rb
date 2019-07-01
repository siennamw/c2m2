class FixForeignKeyAssociations < ActiveRecord::Migration[5.1]
  def change
    add_foreign_key :collections, :repositories

    add_foreign_key :films, :countries
    add_foreign_key :films, :media_types

    add_foreign_key :works, :material_formats
  end
end
