class CreateFilms < ActiveRecord::Migration[5.1]
  def change
    create_table :films do |t|
      t.string :title, null: false
      t.string :secondary_title
      t.text :alias_alternates
      t.string :imdb_link
      t.integer :year, null: false

      t.belongs_to :country, optional: true
      t.belongs_to :media_type

      t.belongs_to :created_by, foreign_key: { to_table: :catalogers }
      t.belongs_to :updated_by, foreign_key: { to_table: :catalogers }, optional: true

      t.timestamps
    end

    create_join_table :composers, :films

    create_join_table :composers, :films, table_name: :orchestrators_films do |t|
      t.index [:film_id, :composer_id], name: 'index_orch_films_on_film_id_and_orch_id'
      t.index [:composer_id, :film_id], name: 'index_orch_films_on_orch_id_and_film_id'
    end

    create_join_table :directors, :films

    create_join_table :production_companies, :films
  end
end
