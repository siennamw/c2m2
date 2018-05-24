class CreateDirectors < ActiveRecord::Migration[5.1]
  def change
    create_table :directors do |t|
      t.string :name, null: false
      t.string :imdb_link

      t.timestamps
    end

    add_index :directors, :name
    add_index :composers, :name
  end
end
