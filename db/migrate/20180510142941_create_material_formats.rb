class CreateMaterialFormats < ActiveRecord::Migration[5.1]
  def change
    create_table :material_formats do |t|
      t.string :name, null: false
      t.text :description

      t.timestamps
    end
    add_index :material_formats, :name, unique: true
  end
end
