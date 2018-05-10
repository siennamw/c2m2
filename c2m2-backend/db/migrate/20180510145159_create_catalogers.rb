class CreateCatalogers < ActiveRecord::Migration[5.1]
  def change
    create_table :catalogers do |t|
      t.string :name, null: false
      t.string :email, null: false
      t.text :description

      t.timestamps
    end
    add_index :catalogers, :email, unique: true
  end
end
