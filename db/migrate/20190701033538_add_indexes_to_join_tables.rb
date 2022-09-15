class AddIndexesToJoinTables < ActiveRecord::Migration[5.1]
  def change
    add_index :collections_works, [:collection_id, :work_id], unique: true
    add_index :collections_works, [:work_id, :collection_id], unique: true

    add_index :composers_films, [:composer_id, :film_id], unique: true
    add_index :composers_films, [:film_id, :composer_id], unique: true

    add_index :directors_films, [:director_id, :film_id], unique: true
    add_index :directors_films, [:film_id, :director_id], unique: true

    add_index :films_production_companies,
      [:film_id, :production_company_id],
      name: 'index_pcs_films_on_film_id_and_pc_id',
      unique: true
    add_index :films_production_companies,
      [:production_company_id, :film_id],
      name: 'index_pcs_films_on_pc_id_and_film_id',
      unique: true

    remove_index :orchestrators_films, name: "index_orch_films_on_orch_id_and_film_id"
    add_index :orchestrators_films,
      [:composer_id, :film_id],
      name: "index_orch_films_on_orch_id_and_film_id",
      unique: true

    remove_index :orchestrators_films, name: "index_orch_films_on_film_id_and_orch_id"
    add_index :orchestrators_films,
      [:film_id, :composer_id],
      name: "index_orch_films_on_film_id_and_orch_id",
      unique: true
  end
end
