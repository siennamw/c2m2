class ImdbLinkUniqueConstraint < ActiveRecord::Migration[6.1]
  def change
    add_index :composers, :imdb_link, unique: true
    add_index :directors, :imdb_link, unique: true
    add_index :works, :imdb_link, unique: true
  end
end
