class FixJoinTableForeignKeys < ActiveRecord::Migration[5.1]
  def change
    add_foreign_key :collections_works, :collections
    add_foreign_key :collections_works, :works

    add_foreign_key :composers_films, :composers
    add_foreign_key :composers_films, :films

    add_foreign_key :directors_films, :directors
    add_foreign_key :directors_films, :films

    add_foreign_key :films_production_companies, :films
    add_foreign_key :films_production_companies, :production_companies

    # This creates test failures; cause unclear
    # add_foreign_key :orchestrators_films, :films
    # add_foreign_key :orchestrators_films, :composers
  end
end
