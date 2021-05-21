class RemainingUuidsToPrimaryAndForeignKeys < ActiveRecord::Migration[6.1]
  def up
    remove_foreign_key :collections_resources, column: :collection_id
    execute 'ALTER TABLE collections drop constraint collections_pkey;'
    rename_column :collections, :id, :id_int
    rename_column :collections, :uuid, :id
    change_column_default :collections, :id_int, nil
    change_column_null :collections, :id_int, true
    execute 'ALTER TABLE collections ADD PRIMARY KEY (id);'
    rename_column :collections_resources, :collection_id, :coll_id_int
    rename_column :collections_resources, :collection_uuid, :collection_id
    add_foreign_key :collections_resources, :collections, column: :collection_id, primary_key: :id
    change_column_null :collections_resources, :coll_id_int, true

    remove_foreign_key :composers_works, column: :composer_id
    remove_foreign_key :orchestrators_works, column: :composer_id
    execute 'ALTER TABLE composers drop constraint composers_pkey;'
    rename_column :composers, :id, :id_int
    rename_column :composers, :uuid, :id
    change_column_default :composers, :id_int, nil
    change_column_null :composers, :id_int, true
    execute 'ALTER TABLE composers ADD PRIMARY KEY (id);'
    rename_column :composers_works, :composer_id, :composer_id_int
    rename_column :composers_works, :composer_uuid, :composer_id
    add_foreign_key :composers_works, :composers, column: :composer_id, primary_key: :id
    change_column_null :composers_works, :composer_id_int, true
    rename_column :orchestrators_works, :composer_id, :composer_id_int
    rename_column :orchestrators_works, :composer_uuid, :composer_id
    add_foreign_key :orchestrators_works, :composers, column: :composer_id, primary_key: :id
    change_column_null :orchestrators_works, :composer_id_int, true

    remove_foreign_key :works, column: :country_id
    execute 'ALTER TABLE countries drop constraint countries_pkey;'
    rename_column :countries, :id, :id_int
    rename_column :countries, :uuid, :id
    change_column_default :countries, :id_int, nil
    change_column_null :countries, :id_int, true
    execute 'ALTER TABLE countries ADD PRIMARY KEY (id);'
    rename_column :works, :country_id, :country_id_int
    rename_column :works, :country_uuid, :country_id
    add_foreign_key :works, :countries, column: :country_id, primary_key: :id
    change_column_null :works, :country_id_int, true

    remove_foreign_key :directors_works, column: :director_id
    execute 'ALTER TABLE directors drop constraint directors_pkey;'
    rename_column :directors, :id, :id_int
    rename_column :directors, :uuid, :id
    change_column_default :directors, :id_int, nil
    change_column_null :directors, :id_int, true
    execute 'ALTER TABLE directors ADD PRIMARY KEY (id);'
    rename_column :directors_works, :director_id, :director_id_int
    rename_column :directors_works, :director_uuid, :director_id
    add_foreign_key :directors_works, :directors, column: :director_id, primary_key: :id
    change_column_null :directors_works, :director_id_int, true

    remove_foreign_key :resources, column: :material_format_id
    execute 'ALTER TABLE material_formats drop constraint material_formats_pkey;'
    rename_column :material_formats, :id, :id_int
    rename_column :material_formats, :uuid, :id
    change_column_default :material_formats, :id_int, nil
    change_column_null :material_formats, :id_int, true
    execute 'ALTER TABLE material_formats ADD PRIMARY KEY (id);'
    rename_column :resources, :material_format_id, :material_format_id_int
    rename_column :resources, :material_format_uuid, :material_format_id
    add_foreign_key :resources, :material_formats, column: :material_format_id, primary_key: :id
    change_column_null :resources, :material_format_id_int, true

    remove_foreign_key :works, column: :media_type_id
    execute 'ALTER TABLE media_types drop constraint media_types_pkey;'
    rename_column :media_types, :id, :id_int
    rename_column :media_types, :uuid, :id
    change_column_default :media_types, :id_int, nil
    change_column_null :media_types, :id_int, true
    execute 'ALTER TABLE media_types ADD PRIMARY KEY (id);'
    rename_column :works, :media_type_id, :media_type_id_int
    rename_column :works, :media_type_uuid, :media_type_id
    add_foreign_key :works, :media_types, column: :media_type_id, primary_key: :id
    change_column_null :works, :media_type_id_int, true

    remove_foreign_key :production_companies_works, column: :production_company_id
    execute 'ALTER TABLE production_companies drop constraint production_companies_pkey;'
    rename_column :production_companies, :id, :id_int
    rename_column :production_companies, :uuid, :id
    change_column_default :production_companies, :id_int, nil
    change_column_null :production_companies, :id_int, true
    execute 'ALTER TABLE production_companies ADD PRIMARY KEY (id);'
    rename_column :production_companies_works, :production_company_id, :production_company_id_int
    rename_column :production_companies_works, :production_company_uuid, :production_company_id
    add_foreign_key :production_companies_works, :production_companies, column: :production_company_id, primary_key: :id
    change_column_null :production_companies_works, :production_company_id_int, true

    remove_foreign_key :collections, column: :repository_id
    execute 'ALTER TABLE repositories drop constraint repositories_pkey;'
    rename_column :repositories, :id, :id_int
    rename_column :repositories, :uuid, :id
    change_column_default :repositories, :id_int, nil
    change_column_null :repositories, :id_int, true
    execute 'ALTER TABLE repositories ADD PRIMARY KEY (id);'
    rename_column :collections, :repository_id, :repository_id_int
    rename_column :collections, :repository_uuid, :repository_id
    add_foreign_key :collections, :repositories, column: :repository_id, primary_key: :id
    change_column_null :collections, :repository_id_int, true

    remove_foreign_key :collections_resources, column: :resource_id
    execute 'ALTER TABLE resources drop constraint resources_pkey;'
    rename_column :resources, :id, :id_int
    rename_column :resources, :uuid, :id
    change_column_default :resources, :id_int, nil
    change_column_null :resources, :id_int, true
    execute 'ALTER TABLE resources ADD PRIMARY KEY (id);'
    rename_column :collections_resources, :resource_id, :resource_id_int
    rename_column :collections_resources, :resource_uuid, :resource_id
    add_foreign_key :collections_resources, :resources, column: :resource_id, primary_key: :id
    change_column_null :collections_resources, :resource_id_int, true

    remove_foreign_key :composers_works, column: :work_id
    remove_foreign_key :orchestrators_works, column: :work_id
    remove_foreign_key :directors_works, column: :work_id
    remove_foreign_key :production_companies_works, column: :work_id
    remove_foreign_key :resources, column: :work_id
    execute 'ALTER TABLE works drop constraint works_pkey;'
    rename_column :works, :id, :id_int
    rename_column :works, :uuid, :id
    change_column_default :works, :id_int, nil
    change_column_null :works, :id_int, true
    execute 'ALTER TABLE works ADD PRIMARY KEY (id);'
    rename_column :composers_works, :work_id, :work_id_int
    rename_column :composers_works, :work_uuid, :work_id
    add_foreign_key :composers_works, :works, column: :work_id, primary_key: :id
    change_column_null :composers_works, :work_id_int, true
    rename_column :orchestrators_works, :work_id, :work_id_int
    rename_column :orchestrators_works, :work_uuid, :work_id
    add_foreign_key :orchestrators_works, :works, column: :work_id, primary_key: :id
    change_column_null :orchestrators_works, :work_id_int, true
    rename_column :directors_works, :work_id, :work_id_int
    rename_column :directors_works, :work_uuid, :work_id
    add_foreign_key :directors_works, :works, column: :work_id, primary_key: :id
    change_column_null :directors_works, :work_id_int, true
    rename_column :production_companies_works, :work_id, :work_id_int
    rename_column :production_companies_works, :work_uuid, :work_id
    add_foreign_key :production_companies_works, :works, column: :work_id, primary_key: :id
    change_column_null :production_companies_works, :work_id_int, true
    rename_column :resources, :work_id, :work_id_int
    rename_column :resources, :work_uuid, :work_id
    add_foreign_key :resources, :works, column: :work_id, primary_key: :id
    change_column_null :resources, :work_id_int, true
  end

  def down
    # resource first to prevent index name too long error in collections_resources later
    remove_foreign_key :collections_resources, column: :resource_id
    rename_column :collections_resources, :resource_id, :resource_uuid
    rename_column :collections_resources, :resource_id_int, :resource_id
    execute 'ALTER TABLE resources drop constraint resources_pkey;'
    rename_column :resources, :id, :uuid
    rename_column :resources, :id_int, :id
    execute 'ALTER TABLE resources ADD PRIMARY KEY (id);'
    add_foreign_key :collections_resources, :resources, column: :resource_id, primary_key: :id

    remove_foreign_key :collections_resources, column: :collection_id
    rename_column :collections_resources, :collection_id, :collection_uuid
    rename_column :collections_resources, :coll_id_int, :collection_id
    execute 'ALTER TABLE collections drop constraint collections_pkey;'
    rename_column :collections, :id, :uuid
    rename_column :collections, :id_int, :id
    execute 'ALTER TABLE collections ADD PRIMARY KEY (id);'
    add_foreign_key :collections_resources, :collections, column: :collection_id, primary_key: :id

    remove_foreign_key :composers_works, column: :composer_id
    rename_column :composers_works, :composer_id, :composer_uuid
    rename_column :composers_works, :composer_id_int, :composer_id
    remove_foreign_key :orchestrators_works, column: :composer_id
    rename_column :orchestrators_works, :composer_id, :composer_uuid
    rename_column :orchestrators_works, :composer_id_int, :composer_id
    execute 'ALTER TABLE composers drop constraint composers_pkey;'
    rename_column :composers, :id, :uuid
    rename_column :composers, :id_int, :id
    execute 'ALTER TABLE composers ADD PRIMARY KEY (id);'
    add_foreign_key :composers_works, :composers, column: :composer_id, primary_key: :id
    add_foreign_key :orchestrators_works, :composers, column: :composer_id, primary_key: :id

    remove_foreign_key :works, column: :country_id
    rename_column :works, :country_id, :country_uuid
    rename_column :works, :country_id_int, :country_id
    execute 'ALTER TABLE countries drop constraint countries_pkey;'
    rename_column :countries, :id, :uuid
    rename_column :countries, :id_int, :id
    execute 'ALTER TABLE countries ADD PRIMARY KEY (id);'
    add_foreign_key :works, :countries, column: :country_id, primary_key: :id

    remove_foreign_key :directors_works, column: :director_id
    rename_column :directors_works, :director_id, :director_uuid
    rename_column :directors_works, :director_id_int, :director_id
    execute 'ALTER TABLE directors drop constraint directors_pkey;'
    rename_column :directors, :id, :uuid
    rename_column :directors, :id_int, :id
    execute 'ALTER TABLE directors ADD PRIMARY KEY (id);'
    add_foreign_key :directors_works, :directors, column: :director_id, primary_key: :id

    remove_foreign_key :resources, column: :material_format_id
    rename_column :resources, :material_format_id, :material_format_uuid
    rename_column :resources, :material_format_id_int, :material_format_id
    execute 'ALTER TABLE material_formats drop constraint material_formats_pkey;'
    rename_column :material_formats, :id, :uuid
    rename_column :material_formats, :id_int, :id
    execute 'ALTER TABLE material_formats ADD PRIMARY KEY (id);'
    add_foreign_key :resources, :material_formats, column: :material_format_id, primary_key: :id

    remove_foreign_key :works, column: :media_type_id
    rename_column :works, :media_type_id, :media_type_uuid
    rename_column :works, :media_type_id_int, :media_type_id
    execute 'ALTER TABLE media_types drop constraint media_types_pkey;'
    rename_column :media_types, :id, :uuid
    rename_column :media_types, :id_int, :id
    execute 'ALTER TABLE media_types ADD PRIMARY KEY (id);'
    add_foreign_key :works, :media_types, column: :media_type_id, primary_key: :id

    remove_foreign_key :production_companies_works, column: :production_company_id
    rename_column :production_companies_works, :production_company_id, :production_company_uuid
    rename_column :production_companies_works, :production_company_id_int, :production_company_id
    execute 'ALTER TABLE production_companies drop constraint production_companies_pkey;'
    rename_column :production_companies, :id, :uuid
    rename_column :production_companies, :id_int, :id
    execute 'ALTER TABLE production_companies ADD PRIMARY KEY (id);'
    add_foreign_key :production_companies_works, :production_companies, column: :production_company_id, primary_key: :id

    remove_foreign_key :collections, column: :repository_id
    rename_column :collections, :repository_id, :repository_uuid
    rename_column :collections, :repository_id_int, :repository_id
    execute 'ALTER TABLE repositories drop constraint repositories_pkey;'
    rename_column :repositories, :id, :uuid
    rename_column :repositories, :id_int, :id
    execute 'ALTER TABLE repositories ADD PRIMARY KEY (id);'
    add_foreign_key :collections, :repositories, column: :repository_id, primary_key: :id

    remove_foreign_key :composers_works, column: :work_id
    rename_column :composers_works, :work_id, :work_uuid
    rename_column :composers_works, :work_id_int, :work_id
    remove_foreign_key :orchestrators_works, column: :work_id
    rename_column :orchestrators_works, :work_id, :work_uuid
    rename_column :orchestrators_works, :work_id_int, :work_id
    remove_foreign_key :directors_works, column: :work_id
    rename_column :directors_works, :work_id, :work_uuid
    rename_column :directors_works, :work_id_int, :work_id
    remove_foreign_key :production_companies_works, column: :work_id
    rename_column :production_companies_works, :work_id, :work_uuid
    rename_column :production_companies_works, :work_id_int, :work_id
    remove_foreign_key :resources, column: :work_id
    rename_column :resources, :work_id, :work_uuid
    rename_column :resources, :work_id_int, :work_id
    execute 'ALTER TABLE works drop constraint works_pkey;'
    rename_column :works, :id, :uuid
    rename_column :works, :id_int, :id
    execute 'ALTER TABLE works ADD PRIMARY KEY (id);'
    add_foreign_key :composers_works, :works, column: :work_id, primary_key: :id
    add_foreign_key :orchestrators_works, :works, column: :work_id, primary_key: :id
    add_foreign_key :directors_works, :works, column: :work_id, primary_key: :id
    add_foreign_key :production_companies_works, :works, column: :work_id, primary_key: :id
    add_foreign_key :resources, :works, column: :work_id, primary_key: :id
  end
end
