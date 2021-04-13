class AddMissingUniqueConstraints < ActiveRecord::Migration[6.1]
  def change
    remove_index :collections, :name, if_exists: true
    remove_index :composers, :name, if_exists: true
    remove_index :directors, :name, if_exists: true
    remove_index :production_companies, :name, if_exists: true
    remove_index :repositories, :name, if_exists: true

    add_index :collections, :name, unique: true
    add_index :composers, :name, unique: true
    add_index :directors, :name, unique: true
    add_index :production_companies, :name, unique: true
    add_index :repositories, :name, unique: true
  end
end
