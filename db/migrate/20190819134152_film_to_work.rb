class FilmToWork < ActiveRecord::Migration[5.1]
  def change
    rename_table :films, :works

    rename_column :resources, :film_id, :work_id

    rename_column :composers_films, :film_id, :work_id
    rename_table :composers_films, :composers_works

    rename_column :directors_films, :film_id, :work_id
    rename_table :directors_films, :directors_works

    rename_column :films_production_companies, :film_id, :work_id
    rename_table :films_production_companies, :production_companies_works

    rename_column :orchestrators_films, :film_id, :work_id
    rename_table :orchestrators_films, :orchestrators_works
  end
end
