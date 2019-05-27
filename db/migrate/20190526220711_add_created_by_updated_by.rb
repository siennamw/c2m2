class AddCreatedByUpdatedBy < ActiveRecord::Migration[5.1]
  def change
    add_reference :catalogers, :updated_by, foreign_key: { to_table: :catalogers }

    rename_column :collections, :cataloger_id, :created_by_id
    add_reference :collections, :updated_by, foreign_key: { to_table: :catalogers }

    rename_column :composers, :cataloger_id, :created_by_id
    add_reference :composers, :updated_by, foreign_key: { to_table: :catalogers }

    rename_column :countries, :cataloger_id, :created_by_id
    add_reference :countries, :updated_by, foreign_key: { to_table: :catalogers }

    rename_column :directors, :cataloger_id, :created_by_id
    add_reference :directors, :updated_by, foreign_key: { to_table: :catalogers }

    rename_column :material_formats, :cataloger_id, :created_by_id
    add_reference :material_formats, :updated_by, foreign_key: { to_table: :catalogers }

    rename_column :media_types, :cataloger_id, :created_by_id
    add_reference :media_types, :updated_by, foreign_key: { to_table: :catalogers }

    rename_column :production_companies, :cataloger_id, :created_by_id
    add_reference :production_companies, :updated_by, foreign_key: { to_table: :catalogers }

    rename_column :publishers, :cataloger_id, :created_by_id
    add_reference :publishers, :updated_by, foreign_key: { to_table: :catalogers }

    rename_column :repositories, :cataloger_id, :created_by_id
    add_reference :repositories, :updated_by, foreign_key: { to_table: :catalogers }

    rename_column :works, :cataloger_id, :created_by_id
    add_reference :works, :updated_by, foreign_key: { to_table: :catalogers }
  end
end
