class RemoveIntegerIds < ActiveRecord::Migration[6.1]
  def change
    remove_column :catalogers, :id_integer
    remove_column :collections, :id_int
    remove_column :collections, :repository_id_int
    remove_column :composers, :id_int
    remove_column :countries, :id_int
    remove_column :directors, :id_int
    remove_column :material_formats, :id_int
    remove_column :media_types, :id_int
    remove_column :production_companies, :id_int
    remove_column :repositories, :id_int
    remove_column :resources, :id_int
    remove_column :resources, :material_format_id_int
    remove_column :resources, :work_id_int
    remove_column :works, :id_int
    remove_column :works, :country_id_int
    remove_column :works, :media_type_id_int

    remove_column :collections_resources, :resource_id_int
    remove_column :collections_resources, :coll_id_int
    remove_column :composers_works, :composer_id_int
    remove_column :composers_works, :work_id_int
    remove_column :directors_works, :director_id_int
    remove_column :directors_works, :work_id_int
    remove_column :orchestrators_works, :composer_id_int
    remove_column :orchestrators_works, :work_id_int
    remove_column :production_companies_works, :production_company_id_int
    remove_column :production_companies_works, :work_id_int

    remove_column :catalogers, :created_by_id_integer
    remove_column :catalogers, :updated_by_id_integer
    remove_column :collections, :created_by_id_integer
    remove_column :collections, :updated_by_id_integer
    remove_column :composers, :created_by_id_integer
    remove_column :composers, :updated_by_id_integer
    remove_column :countries, :created_by_id_integer
    remove_column :countries, :updated_by_id_integer
    remove_column :directors, :created_by_id_integer
    remove_column :directors, :updated_by_id_integer
    remove_column :material_formats, :created_by_id_integer
    remove_column :material_formats, :updated_by_id_integer
    remove_column :media_types, :created_by_id_integer
    remove_column :media_types, :updated_by_id_integer
    remove_column :production_companies, :created_by_id_integer
    remove_column :production_companies, :updated_by_id_integer
    remove_column :repositories, :created_by_id_integer
    remove_column :repositories, :updated_by_id_integer
    remove_column :resources, :created_by_id_integer
    remove_column :resources, :updated_by_id_integer
    remove_column :works, :created_by_id_integer
    remove_column :works, :updated_by_id_integer
  end
end
