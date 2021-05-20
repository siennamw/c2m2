class CatalogerUuidsToPrimaryAndForeignKeys < ActiveRecord::Migration[6.1]
  def up
    remove_foreign_key :catalogers, column: :created_by_id
    remove_foreign_key :catalogers, column: :updated_by_id
    remove_foreign_key :collections, column: :created_by_id
    remove_foreign_key :collections, column: :updated_by_id
    remove_foreign_key :composers, column: :created_by_id
    remove_foreign_key :composers, column: :updated_by_id
    remove_foreign_key :countries, column: :created_by_id
    remove_foreign_key :countries, column: :updated_by_id
    remove_foreign_key :directors, column: :created_by_id
    remove_foreign_key :directors, column: :updated_by_id
    remove_foreign_key :material_formats, column: :created_by_id
    remove_foreign_key :material_formats, column: :updated_by_id
    remove_foreign_key :media_types, column: :created_by_id
    remove_foreign_key :media_types, column: :updated_by_id
    remove_foreign_key :production_companies, column: :created_by_id
    remove_foreign_key :production_companies, column: :updated_by_id
    remove_foreign_key :repositories, column: :created_by_id
    remove_foreign_key :repositories, column: :updated_by_id
    remove_foreign_key :resources, column: :created_by_id
    remove_foreign_key :resources, column: :updated_by_id
    remove_foreign_key :works, column: :created_by_id
    remove_foreign_key :works, column: :updated_by_id

    execute 'ALTER TABLE catalogers drop constraint catalogers_pkey;'
    rename_column :catalogers, :id, :id_integer
    rename_column :catalogers, :uuid, :id
    change_column_default :catalogers, :id_integer, nil
    change_column_null :catalogers, :id_integer, true
    execute 'ALTER TABLE catalogers ADD PRIMARY KEY (id);'

    rename_column :catalogers, :created_by_id, :created_by_id_integer
    rename_column :catalogers, :updated_by_id, :updated_by_id_integer
    rename_column :catalogers, :created_by_uuid, :created_by_id
    rename_column :catalogers, :updated_by_uuid, :updated_by_id

    add_foreign_key :catalogers, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :catalogers, :catalogers, column: :updated_by_id, primary_key: :id

    rename_column :collections, :created_by_id, :created_by_id_integer
    rename_column :collections, :updated_by_id, :updated_by_id_integer
    rename_column :collections, :created_by_uuid, :created_by_id
    rename_column :collections, :updated_by_uuid, :updated_by_id

    add_foreign_key :collections, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :collections, :catalogers, column: :updated_by_id, primary_key: :id

    rename_column :composers, :created_by_id, :created_by_id_integer
    rename_column :composers, :updated_by_id, :updated_by_id_integer
    rename_column :composers, :created_by_uuid, :created_by_id
    rename_column :composers, :updated_by_uuid, :updated_by_id

    add_foreign_key :composers, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :composers, :catalogers, column: :updated_by_id, primary_key: :id

    rename_column :countries, :created_by_id, :created_by_id_integer
    rename_column :countries, :updated_by_id, :updated_by_id_integer
    rename_column :countries, :created_by_uuid, :created_by_id
    rename_column :countries, :updated_by_uuid, :updated_by_id

    add_foreign_key :countries, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :countries, :catalogers, column: :updated_by_id, primary_key: :id

    rename_column :directors, :created_by_id, :created_by_id_integer
    rename_column :directors, :updated_by_id, :updated_by_id_integer
    rename_column :directors, :created_by_uuid, :created_by_id
    rename_column :directors, :updated_by_uuid, :updated_by_id

    add_foreign_key :directors, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :directors, :catalogers, column: :updated_by_id, primary_key: :id

    rename_column :material_formats, :created_by_id, :created_by_id_integer
    rename_column :material_formats, :updated_by_id, :updated_by_id_integer
    rename_column :material_formats, :created_by_uuid, :created_by_id
    rename_column :material_formats, :updated_by_uuid, :updated_by_id

    add_foreign_key :material_formats, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :material_formats, :catalogers, column: :updated_by_id, primary_key: :id

    rename_column :media_types, :created_by_id, :created_by_id_integer
    rename_column :media_types, :updated_by_id, :updated_by_id_integer
    rename_column :media_types, :created_by_uuid, :created_by_id
    rename_column :media_types, :updated_by_uuid, :updated_by_id

    add_foreign_key :media_types, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :media_types, :catalogers, column: :updated_by_id, primary_key: :id

    rename_column :production_companies, :created_by_id, :created_by_id_integer
    rename_column :production_companies, :updated_by_id, :updated_by_id_integer
    rename_column :production_companies, :created_by_uuid, :created_by_id
    rename_column :production_companies, :updated_by_uuid, :updated_by_id

    add_foreign_key :production_companies, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :production_companies, :catalogers, column: :updated_by_id, primary_key: :id

    rename_column :repositories, :created_by_id, :created_by_id_integer
    rename_column :repositories, :updated_by_id, :updated_by_id_integer
    rename_column :repositories, :created_by_uuid, :created_by_id
    rename_column :repositories, :updated_by_uuid, :updated_by_id

    add_foreign_key :repositories, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :repositories, :catalogers, column: :updated_by_id, primary_key: :id

    rename_column :resources, :created_by_id, :created_by_id_integer
    rename_column :resources, :updated_by_id, :updated_by_id_integer
    rename_column :resources, :created_by_uuid, :created_by_id
    rename_column :resources, :updated_by_uuid, :updated_by_id

    add_foreign_key :resources, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :resources, :catalogers, column: :updated_by_id, primary_key: :id

    rename_column :works, :created_by_id, :created_by_id_integer
    rename_column :works, :updated_by_id, :updated_by_id_integer
    rename_column :works, :created_by_uuid, :created_by_id
    rename_column :works, :updated_by_uuid, :updated_by_id

    add_foreign_key :works, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :works, :catalogers, column: :updated_by_id, primary_key: :id
  end

  def down
    remove_foreign_key :catalogers, column: :created_by_id
    remove_foreign_key :catalogers, column: :updated_by_id

    rename_column :catalogers, :created_by_id, :created_by_uuid
    rename_column :catalogers, :updated_by_id, :updated_by_uuid
    rename_column :catalogers, :created_by_id_integer, :created_by_id
    rename_column :catalogers, :updated_by_id_integer, :updated_by_id

    remove_foreign_key :collections, column: :created_by_id
    remove_foreign_key :collections, column: :updated_by_id

    rename_column :collections, :created_by_id, :created_by_uuid
    rename_column :collections, :updated_by_id, :updated_by_uuid
    rename_column :collections, :created_by_id_integer, :created_by_id
    rename_column :collections, :updated_by_id_integer, :updated_by_id

    remove_foreign_key :composers, column: :created_by_id
    remove_foreign_key :composers, column: :updated_by_id

    rename_column :composers, :created_by_id, :created_by_uuid
    rename_column :composers, :updated_by_id, :updated_by_uuid
    rename_column :composers, :created_by_id_integer, :created_by_id
    rename_column :composers, :updated_by_id_integer, :updated_by_id

    remove_foreign_key :countries, column: :created_by_id
    remove_foreign_key :countries, column: :updated_by_id

    rename_column :countries, :created_by_id, :created_by_uuid
    rename_column :countries, :updated_by_id, :updated_by_uuid
    rename_column :countries, :created_by_id_integer, :created_by_id
    rename_column :countries, :updated_by_id_integer, :updated_by_id

    remove_foreign_key :directors, column: :created_by_id
    remove_foreign_key :directors, column: :updated_by_id

    rename_column :directors, :created_by_id, :created_by_uuid
    rename_column :directors, :updated_by_id, :updated_by_uuid
    rename_column :directors, :created_by_id_integer, :created_by_id
    rename_column :directors, :updated_by_id_integer, :updated_by_id

    remove_foreign_key :material_formats, column: :created_by_id
    remove_foreign_key :material_formats, column: :updated_by_id

    rename_column :material_formats, :created_by_id, :created_by_uuid
    rename_column :material_formats, :updated_by_id, :updated_by_uuid
    rename_column :material_formats, :created_by_id_integer, :created_by_id
    rename_column :material_formats, :updated_by_id_integer, :updated_by_id

    remove_foreign_key :media_types, column: :created_by_id
    remove_foreign_key :media_types, column: :updated_by_id

    rename_column :media_types, :created_by_id, :created_by_uuid
    rename_column :media_types, :updated_by_id, :updated_by_uuid
    rename_column :media_types, :created_by_id_integer, :created_by_id
    rename_column :media_types, :updated_by_id_integer, :updated_by_id

    remove_foreign_key :production_companies, column: :created_by_id
    remove_foreign_key :production_companies, column: :updated_by_id

    rename_column :production_companies, :created_by_id, :created_by_uuid
    rename_column :production_companies, :updated_by_id, :updated_by_uuid
    rename_column :production_companies, :created_by_id_integer, :created_by_id
    rename_column :production_companies, :updated_by_id_integer, :updated_by_id

    remove_foreign_key :repositories, column: :created_by_id
    remove_foreign_key :repositories, column: :updated_by_id

    rename_column :repositories, :created_by_id, :created_by_uuid
    rename_column :repositories, :updated_by_id, :updated_by_uuid
    rename_column :repositories, :created_by_id_integer, :created_by_id
    rename_column :repositories, :updated_by_id_integer, :updated_by_id

    remove_foreign_key :resources, column: :created_by_id
    remove_foreign_key :resources, column: :updated_by_id

    rename_column :resources, :created_by_id, :created_by_uuid
    rename_column :resources, :updated_by_id, :updated_by_uuid
    rename_column :resources, :created_by_id_integer, :created_by_id
    rename_column :resources, :updated_by_id_integer, :updated_by_id

    remove_foreign_key :works, column: :created_by_id
    remove_foreign_key :works, column: :updated_by_id

    rename_column :works, :created_by_id, :created_by_uuid
    rename_column :works, :updated_by_id, :updated_by_uuid
    rename_column :works, :created_by_id_integer, :created_by_id
    rename_column :works, :updated_by_id_integer, :updated_by_id

    execute 'ALTER TABLE catalogers drop constraint catalogers_pkey;'
    rename_column :catalogers, :id, :uuid
    rename_column :catalogers, :id_integer, :id
    execute 'ALTER TABLE catalogers ADD PRIMARY KEY (id);'

    add_foreign_key :catalogers, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :catalogers, :catalogers, column: :updated_by_id, primary_key: :id
    add_foreign_key :collections, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :collections, :catalogers, column: :updated_by_id, primary_key: :id
    add_foreign_key :composers, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :composers, :catalogers, column: :updated_by_id, primary_key: :id
    add_foreign_key :countries, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :countries, :catalogers, column: :updated_by_id, primary_key: :id
    add_foreign_key :directors, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :directors, :catalogers, column: :updated_by_id, primary_key: :id
    add_foreign_key :material_formats, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :material_formats, :catalogers, column: :updated_by_id, primary_key: :id
    add_foreign_key :media_types, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :media_types, :catalogers, column: :updated_by_id, primary_key: :id
    add_foreign_key :production_companies, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :production_companies, :catalogers, column: :updated_by_id, primary_key: :id
    add_foreign_key :repositories, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :repositories, :catalogers, column: :updated_by_id, primary_key: :id
    add_foreign_key :resources, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :resources, :catalogers, column: :updated_by_id, primary_key: :id
    add_foreign_key :works, :catalogers, column: :created_by_id, primary_key: :id
    add_foreign_key :works, :catalogers, column: :updated_by_id, primary_key: :id
  end
end
