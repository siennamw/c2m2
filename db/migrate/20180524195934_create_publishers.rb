class CreatePublishers < ActiveRecord::Migration[5.1]
  def change
    create_table :publishers do |t|
      t.string :name, null: false
      t.text :contact_info

      t.timestamps
    end
  end
end
