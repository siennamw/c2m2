class ConvertCatalogerIdsToUuids < ActiveRecord::Migration[6.1]
  def up
    add_column :catalogers, :uuid, :uuid, default: "gen_random_uuid()", null: false

    add_column :catalogers, :created_by_uuid, :uuid
    add_column :catalogers, :updated_by_uuid, :uuid
    execute <<-SQL
      UPDATE catalogers as ca SET created_by_uuid = cb.uuid
      FROM catalogers as cb WHERE ca.created_by_id = cb.id;
      UPDATE catalogers as ca SET updated_by_uuid = cb.uuid
      FROM catalogers as cb WHERE ca.updated_by_id = cb.id;
    SQL

    add_column :collections, :created_by_uuid, :uuid
    add_column :collections, :updated_by_uuid, :uuid
    execute <<-SQL
      UPDATE collections SET created_by_uuid = catalogers.uuid
      FROM catalogers WHERE collections.created_by_id = catalogers.id;
      UPDATE collections SET updated_by_uuid = catalogers.uuid
      FROM catalogers WHERE collections.updated_by_id = catalogers.id;
    SQL
    change_column_null :collections, :created_by_uuid, false

    add_column :composers, :created_by_uuid, :uuid
    add_column :composers, :updated_by_uuid, :uuid
    execute <<-SQL
      UPDATE composers SET created_by_uuid = catalogers.uuid
      FROM catalogers WHERE composers.created_by_id = catalogers.id;
      UPDATE composers SET updated_by_uuid = catalogers.uuid
      FROM catalogers WHERE composers.updated_by_id = catalogers.id;
    SQL
    change_column_null :composers, :created_by_uuid, false

    add_column :countries, :created_by_uuid, :uuid
    add_column :countries, :updated_by_uuid, :uuid
    execute <<-SQL
      UPDATE countries SET created_by_uuid = catalogers.uuid
      FROM catalogers WHERE countries.created_by_id = catalogers.id;
      UPDATE countries SET updated_by_uuid = catalogers.uuid
      FROM catalogers WHERE countries.updated_by_id = catalogers.id;
    SQL
    change_column_null :countries, :created_by_uuid, false

    add_column :directors, :created_by_uuid, :uuid
    add_column :directors, :updated_by_uuid, :uuid
    execute <<-SQL
      UPDATE directors SET created_by_uuid = catalogers.uuid
      FROM catalogers WHERE directors.created_by_id = catalogers.id;
      UPDATE directors SET updated_by_uuid = catalogers.uuid
      FROM catalogers WHERE directors.updated_by_id = catalogers.id;
    SQL
    change_column_null :directors, :created_by_uuid, false

    add_column :material_formats, :created_by_uuid, :uuid
    add_column :material_formats, :updated_by_uuid, :uuid
    execute <<-SQL
      UPDATE material_formats SET created_by_uuid = catalogers.uuid
      FROM catalogers WHERE material_formats.created_by_id = catalogers.id;
      UPDATE material_formats SET updated_by_uuid = catalogers.uuid
      FROM catalogers WHERE material_formats.updated_by_id = catalogers.id;
    SQL
    change_column_null :material_formats, :created_by_uuid, false

    add_column :media_types, :created_by_uuid, :uuid
    add_column :media_types, :updated_by_uuid, :uuid
    execute <<-SQL
      UPDATE media_types SET created_by_uuid = catalogers.uuid
      FROM catalogers WHERE media_types.created_by_id = catalogers.id;
      UPDATE media_types SET updated_by_uuid = catalogers.uuid
      FROM catalogers WHERE media_types.updated_by_id = catalogers.id;
    SQL
    change_column_null :media_types, :created_by_uuid, false

    add_column :production_companies, :created_by_uuid, :uuid
    add_column :production_companies, :updated_by_uuid, :uuid
    execute <<-SQL
      UPDATE production_companies SET created_by_uuid = catalogers.uuid
      FROM catalogers WHERE production_companies.created_by_id = catalogers.id;
      UPDATE production_companies SET updated_by_uuid = catalogers.uuid
      FROM catalogers WHERE production_companies.updated_by_id = catalogers.id;
    SQL
    change_column_null :production_companies, :created_by_uuid, false

    add_column :repositories, :created_by_uuid, :uuid
    add_column :repositories, :updated_by_uuid, :uuid
    execute <<-SQL
      UPDATE repositories SET created_by_uuid = catalogers.uuid
      FROM catalogers WHERE repositories.created_by_id = catalogers.id;
      UPDATE repositories SET updated_by_uuid = catalogers.uuid
      FROM catalogers WHERE repositories.updated_by_id = catalogers.id;
    SQL
    change_column_null :repositories, :created_by_uuid, false

    add_column :resources, :created_by_uuid, :uuid
    add_column :resources, :updated_by_uuid, :uuid
    execute <<-SQL
      UPDATE resources SET created_by_uuid = catalogers.uuid
      FROM catalogers WHERE resources.created_by_id = catalogers.id;
      UPDATE resources SET updated_by_uuid = catalogers.uuid
      FROM catalogers WHERE resources.updated_by_id = catalogers.id;
    SQL
    change_column_null :resources, :created_by_uuid, false

    add_column :works, :created_by_uuid, :uuid
    add_column :works, :updated_by_uuid, :uuid
    execute <<-SQL
      UPDATE works SET created_by_uuid = catalogers.uuid
      FROM catalogers WHERE works.created_by_id = catalogers.id;
      UPDATE works SET updated_by_uuid = catalogers.uuid
      FROM catalogers WHERE works.updated_by_id = catalogers.id;
    SQL
    change_column_null :works, :created_by_uuid, false
  end

  def down
    remove_column :catalogers, :uuid

    remove_column :catalogers, :created_by_uuid
    remove_column :catalogers, :updated_by_uuid

    remove_column :collections, :created_by_uuid
    remove_column :collections, :updated_by_uuid

    remove_column :composers, :created_by_uuid
    remove_column :composers, :updated_by_uuid

    remove_column :countries, :created_by_uuid
    remove_column :countries, :updated_by_uuid

    remove_column :directors, :created_by_uuid
    remove_column :directors, :updated_by_uuid

    remove_column :material_formats, :created_by_uuid
    remove_column :material_formats, :updated_by_uuid

    remove_column :media_types, :created_by_uuid
    remove_column :media_types, :updated_by_uuid

    remove_column :production_companies, :created_by_uuid
    remove_column :production_companies, :updated_by_uuid

    remove_column :repositories, :created_by_uuid
    remove_column :repositories, :updated_by_uuid

    remove_column :resources, :created_by_uuid
    remove_column :resources, :updated_by_uuid

    remove_column :works, :created_by_uuid
    remove_column :works, :updated_by_uuid
  end
end
