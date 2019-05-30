# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20190530004226) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "catalogers", force: :cascade do |t|
    t.string "name", null: false
    t.string "email", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "password_digest"
    t.bigint "created_by_id"
    t.boolean "admin", default: false, null: false
    t.bigint "updated_by_id"
    t.index ["admin"], name: "index_catalogers_on_admin"
    t.index ["created_by_id"], name: "index_catalogers_on_created_by_id"
    t.index ["email"], name: "index_catalogers_on_email", unique: true
    t.index ["updated_by_id"], name: "index_catalogers_on_updated_by_id"
  end

  create_table "collections", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.bigint "repository_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.index ["created_by_id"], name: "index_collections_on_created_by_id"
    t.index ["repository_id"], name: "index_collections_on_repository_id"
    t.index ["updated_by_id"], name: "index_collections_on_updated_by_id"
  end

  create_table "collections_works", id: false, force: :cascade do |t|
    t.bigint "work_id", null: false
    t.bigint "collection_id", null: false
    t.index ["collection_id", "work_id"], name: "index_coll_works_on_coll_id_and_work_id"
    t.index ["work_id", "collection_id"], name: "index_coll_works_on_work_id_and_coll_id"
  end

  create_table "composers", force: :cascade do |t|
    t.string "name", null: false
    t.string "imdb_link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.index ["created_by_id"], name: "index_composers_on_created_by_id"
    t.index ["name"], name: "index_composers_on_name"
    t.index ["updated_by_id"], name: "index_composers_on_updated_by_id"
  end

  create_table "composers_films", id: false, force: :cascade do |t|
    t.bigint "composer_id", null: false
    t.bigint "film_id", null: false
  end

  create_table "composers_works", id: false, force: :cascade do |t|
    t.bigint "work_id", null: false
    t.bigint "composer_id", null: false
    t.index ["composer_id", "work_id"], name: "index_composers_works_on_composer_id_and_work_id"
    t.index ["work_id", "composer_id"], name: "index_composers_works_on_work_id_and_composer_id"
  end

  create_table "countries", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.index ["created_by_id"], name: "index_countries_on_created_by_id"
    t.index ["name"], name: "index_countries_on_name", unique: true
    t.index ["updated_by_id"], name: "index_countries_on_updated_by_id"
  end

  create_table "directors", force: :cascade do |t|
    t.string "name", null: false
    t.string "imdb_link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.index ["created_by_id"], name: "index_directors_on_created_by_id"
    t.index ["name"], name: "index_directors_on_name"
    t.index ["updated_by_id"], name: "index_directors_on_updated_by_id"
  end

  create_table "directors_films", id: false, force: :cascade do |t|
    t.bigint "director_id", null: false
    t.bigint "film_id", null: false
  end

  create_table "directors_works", id: false, force: :cascade do |t|
    t.bigint "work_id", null: false
    t.bigint "director_id", null: false
    t.index ["director_id", "work_id"], name: "index_directors_works_on_director_id_and_work_id"
    t.index ["work_id", "director_id"], name: "index_directors_works_on_work_id_and_director_id"
  end

  create_table "films", force: :cascade do |t|
    t.string "title", null: false
    t.string "secondary_title"
    t.text "alias_alternates"
    t.string "imdb_link"
    t.integer "year", null: false
    t.bigint "country_id"
    t.bigint "media_type_id"
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["country_id"], name: "index_films_on_country_id"
    t.index ["created_by_id"], name: "index_films_on_created_by_id"
    t.index ["media_type_id"], name: "index_films_on_media_type_id"
    t.index ["updated_by_id"], name: "index_films_on_updated_by_id"
  end

  create_table "films_production_companies", id: false, force: :cascade do |t|
    t.bigint "production_company_id", null: false
    t.bigint "film_id", null: false
  end

  create_table "material_formats", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.index ["created_by_id"], name: "index_material_formats_on_created_by_id"
    t.index ["name"], name: "index_material_formats_on_name", unique: true
    t.index ["updated_by_id"], name: "index_material_formats_on_updated_by_id"
  end

  create_table "media_types", force: :cascade do |t|
    t.string "name", null: false
    t.text "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.index ["created_by_id"], name: "index_media_types_on_created_by_id"
    t.index ["name"], name: "index_media_types_on_name", unique: true
    t.index ["updated_by_id"], name: "index_media_types_on_updated_by_id"
  end

  create_table "orchestrators_films", id: false, force: :cascade do |t|
    t.bigint "composer_id", null: false
    t.bigint "film_id", null: false
    t.index ["composer_id", "film_id"], name: "index_orch_films_on_orch_id_and_film_id"
    t.index ["film_id", "composer_id"], name: "index_orch_films_on_film_id_and_orch_id"
  end

  create_table "orchestrators_works", id: false, force: :cascade do |t|
    t.bigint "composer_id", null: false
    t.bigint "work_id", null: false
    t.index ["composer_id", "work_id"], name: "index_orch_works_on_orch_id_and_work_id"
    t.index ["work_id", "composer_id"], name: "index_orch_works_on_work_id_and_orch_id"
  end

  create_table "production_companies", force: :cascade do |t|
    t.string "name", null: false
    t.text "contact_info"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.index ["created_by_id"], name: "index_production_companies_on_created_by_id"
    t.index ["updated_by_id"], name: "index_production_companies_on_updated_by_id"
  end

  create_table "production_companies_works", id: false, force: :cascade do |t|
    t.bigint "work_id", null: false
    t.bigint "production_company_id", null: false
    t.index ["production_company_id", "work_id"], name: "index_pcs_works_on_pc_id_and_work_id"
    t.index ["work_id", "production_company_id"], name: "index_pcs_works_on_work_id_and_pc_id"
  end

  create_table "publishers", force: :cascade do |t|
    t.string "name", null: false
    t.text "contact_info"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.index ["created_by_id"], name: "index_publishers_on_created_by_id"
    t.index ["updated_by_id"], name: "index_publishers_on_updated_by_id"
  end

  create_table "publishers_works", id: false, force: :cascade do |t|
    t.bigint "work_id", null: false
    t.bigint "publisher_id", null: false
    t.index ["publisher_id", "work_id"], name: "index_publishers_works_on_publisher_id_and_work_id"
    t.index ["work_id", "publisher_id"], name: "index_publishers_works_on_work_id_and_publisher_id"
  end

  create_table "repositories", force: :cascade do |t|
    t.string "name", null: false
    t.string "location", null: false
    t.string "website"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "created_by_id"
    t.bigint "updated_by_id"
    t.index ["created_by_id"], name: "index_repositories_on_created_by_id"
    t.index ["updated_by_id"], name: "index_repositories_on_updated_by_id"
  end

  create_table "works", force: :cascade do |t|
    t.string "title", null: false
    t.string "secondary_title"
    t.integer "year", null: false
    t.string "finding_aid_link"
    t.string "digital_copy_link"
    t.text "citation_source"
    t.text "alias_alternates"
    t.text "cataloging_notes"
    t.bigint "country_id"
    t.bigint "media_type_id", null: false
    t.bigint "material_format_id", null: false
    t.bigint "created_by_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "publication_status", default: "draft", null: false
    t.bigint "updated_by_id"
    t.index ["country_id"], name: "index_works_on_country_id"
    t.index ["created_by_id"], name: "index_works_on_created_by_id"
    t.index ["material_format_id"], name: "index_works_on_material_format_id"
    t.index ["media_type_id"], name: "index_works_on_media_type_id"
    t.index ["publication_status"], name: "index_works_on_publication_status"
    t.index ["updated_by_id"], name: "index_works_on_updated_by_id"
  end

  add_foreign_key "catalogers", "catalogers", column: "created_by_id"
  add_foreign_key "catalogers", "catalogers", column: "updated_by_id"
  add_foreign_key "collections", "catalogers", column: "created_by_id"
  add_foreign_key "collections", "catalogers", column: "updated_by_id"
  add_foreign_key "composers", "catalogers", column: "created_by_id"
  add_foreign_key "composers", "catalogers", column: "updated_by_id"
  add_foreign_key "countries", "catalogers", column: "created_by_id"
  add_foreign_key "countries", "catalogers", column: "updated_by_id"
  add_foreign_key "directors", "catalogers", column: "created_by_id"
  add_foreign_key "directors", "catalogers", column: "updated_by_id"
  add_foreign_key "films", "catalogers", column: "created_by_id"
  add_foreign_key "films", "catalogers", column: "updated_by_id"
  add_foreign_key "material_formats", "catalogers", column: "created_by_id"
  add_foreign_key "material_formats", "catalogers", column: "updated_by_id"
  add_foreign_key "media_types", "catalogers", column: "created_by_id"
  add_foreign_key "media_types", "catalogers", column: "updated_by_id"
  add_foreign_key "production_companies", "catalogers", column: "created_by_id"
  add_foreign_key "production_companies", "catalogers", column: "updated_by_id"
  add_foreign_key "publishers", "catalogers", column: "created_by_id"
  add_foreign_key "publishers", "catalogers", column: "updated_by_id"
  add_foreign_key "repositories", "catalogers", column: "created_by_id"
  add_foreign_key "repositories", "catalogers", column: "updated_by_id"
  add_foreign_key "works", "catalogers", column: "created_by_id"
  add_foreign_key "works", "catalogers", column: "updated_by_id"
end
