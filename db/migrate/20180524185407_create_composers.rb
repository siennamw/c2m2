class CreateComposers < ActiveRecord::Migration[5.1]
  def change
    create_table :composers do |t|
      t.string :name, null: false
      t.string :imdb_link

      t.timestamps
    end
  end
end
