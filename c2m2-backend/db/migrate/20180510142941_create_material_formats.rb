class CreateMaterialFormats < ActiveRecord::Migration[5.1]
  def change
    create_table :material_formats do |t|
      t.string :name, null: false

      t.timestamps
    end
  end
end
