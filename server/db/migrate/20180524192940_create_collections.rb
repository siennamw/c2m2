class CreateCollections < ActiveRecord::Migration[5.1]
  def change
    create_table :collections do |t|
      t.string :name, null: false, unique: true
      t.string :description
      t.belongs_to :repository, index: true, null: false

      t.timestamps
    end
  end
end
