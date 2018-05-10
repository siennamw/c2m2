class CreateMediaTypes < ActiveRecord::Migration[5.1]
  def change
    create_table :media_types do |t|
      t.string :name, null: false
      t.text :description

      t.timestamps
    end
    add_index :media_types, :name, unique: true
  end
end
