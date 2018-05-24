class CreateCollections < ActiveRecord::Migration[5.1]
  def change
    create_table :collections do |t|
      t.string :name, null: false, unique: true
      t.string :description

      t.timestamps
    end

    add_foreign_key :collections, :repository, null: false
  end
end
