class ConvertRemainingIdsToUuids < ActiveRecord::Migration[6.1]
  def up
    add_column :collections, :uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :collections_resources, :collection_uuid, :uuid
    execute <<-SQL
      UPDATE collections_resources SET collection_uuid = collections.uuid
      FROM collections WHERE collections.id = collections_resources.collection_id;
    SQL
    change_column_null :collections_resources, :collection_uuid, false

    add_column :composers, :uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :composers_works, :composer_uuid, :uuid
    add_column :orchestrators_works, :composer_uuid, :uuid
    execute <<-SQL
      UPDATE composers_works SET composer_uuid = composers.uuid
      FROM composers WHERE composers.id = composers_works.composer_id;
      UPDATE orchestrators_works SET composer_uuid = composers.uuid
      FROM composers WHERE composers.id = orchestrators_works.composer_id;
    SQL
    change_column_null :composers_works, :composer_uuid, false
    change_column_null :orchestrators_works, :composer_uuid, false

    add_column :countries, :uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :works, :country_uuid, :uuid
    execute <<-SQL
      UPDATE works SET country_uuid = countries.uuid
      FROM countries WHERE countries.id = works.country_id;
    SQL

    add_column :directors, :uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :directors_works, :director_uuid, :uuid
    execute <<-SQL
      UPDATE directors_works SET director_uuid = directors.uuid
      FROM directors WHERE directors.id = directors_works.director_id;
    SQL
    change_column_null :directors_works, :director_uuid, false

    add_column :material_formats, :uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :resources, :material_format_uuid, :uuid
    execute <<-SQL
      UPDATE resources SET material_format_uuid = material_formats.uuid
      FROM material_formats WHERE material_formats.id = resources.material_format_id;
    SQL
    change_column_null :resources, :material_format_uuid, false

    add_column :media_types, :uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :works, :media_type_uuid, :uuid
    execute <<-SQL
      UPDATE works SET media_type_uuid = media_types.uuid
      FROM media_types WHERE media_types.id = works.media_type_id;
    SQL
    change_column_null :works, :media_type_uuid, false

    add_column :production_companies, :uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :production_companies_works, :production_company_uuid, :uuid
    execute <<-SQL
      UPDATE production_companies_works SET production_company_uuid = production_companies.uuid
      FROM production_companies WHERE production_companies.id = production_companies_works.production_company_id;
    SQL
    change_column_null :production_companies_works, :production_company_uuid, false

    add_column :repositories, :uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :collections, :repository_uuid, :uuid
    execute <<-SQL
      UPDATE collections SET repository_uuid = repositories.uuid
      FROM repositories WHERE repositories.id = collections.repository_id;
    SQL
    change_column_null :collections, :repository_uuid, false

    add_column :resources, :uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :collections_resources, :resource_uuid, :uuid
    execute <<-SQL
      UPDATE collections_resources SET resource_uuid = resources.uuid
      FROM resources WHERE resources.id = collections_resources.resource_id;
    SQL
    change_column_null :collections_resources, :resource_uuid, false

    add_column :works, :uuid, :uuid, default: "gen_random_uuid()", null: false
    add_column :composers_works, :work_uuid, :uuid
    add_column :orchestrators_works, :work_uuid, :uuid
    add_column :directors_works, :work_uuid, :uuid
    add_column :production_companies_works, :work_uuid, :uuid
    add_column :resources, :work_uuid, :uuid
    execute <<-SQL
      UPDATE composers_works SET work_uuid = works.uuid
      FROM works WHERE works.id = composers_works.work_id;
      UPDATE orchestrators_works SET work_uuid = works.uuid
      FROM works WHERE works.id = orchestrators_works.work_id;
      UPDATE directors_works SET work_uuid = works.uuid
      FROM works WHERE works.id = directors_works.work_id;
      UPDATE production_companies_works SET work_uuid = works.uuid
      FROM works WHERE works.id = production_companies_works.work_id;
      UPDATE resources SET work_uuid = works.uuid
      FROM works WHERE works.id = resources.work_id;
    SQL
    change_column_null :composers_works, :work_uuid, false
    change_column_null :orchestrators_works, :work_uuid, false
    change_column_null :directors_works, :work_uuid, false
    change_column_null :production_companies_works, :work_uuid, false
    change_column_null :resources, :work_uuid, false
  end

  def down
    remove_column :collections, :uuid
    remove_column :collections_resources, :collection_uuid

    remove_column :composers, :uuid
    remove_column :composers_works, :composer_uuid
    remove_column :orchestrators_works, :composer_uuid

    remove_column :countries, :uuid
    remove_column :works, :country_uuid

    remove_column :directors, :uuid
    remove_column :directors_works, :director_uuid

    remove_column :material_formats, :uuid
    remove_column :resources, :material_format_uuid

    remove_column :media_types, :uuid
    remove_column :works, :media_type_uuid

    remove_column :production_companies, :uuid
    remove_column :production_companies_works, :production_company_uuid

    remove_column :repositories, :uuid
    remove_column :collections, :repository_uuid

    remove_column :resources, :uuid
    remove_column :collections_resources, :resource_uuid

    remove_column :works, :uuid
    remove_column :composers_works, :work_uuid
    remove_column :orchestrators_works, :work_uuid
    remove_column :directors_works, :work_uuid
    remove_column :production_companies_works, :work_uuid
    remove_column :resources, :work_uuid
  end
end
