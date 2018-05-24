class CreateRepositories < ActiveRecord::Migration[5.1]
  def change
    create_table :repositories do |t|
      t.string :name, null: false
      t.string :location, null: false
      t.string :website

      t.timestamps
    end
  end
end
