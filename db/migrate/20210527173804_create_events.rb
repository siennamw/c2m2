class CreateEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :events, id: :uuid do |t|
      t.datetime :created_at, precision: 6, null: false, index: true
      t.belongs_to :created_by, type: :uuid, foreign_key: { to_table: :catalogers }, null: false
      t.string :name, null: false, index: true
      t.uuid :entity_id, null: false, index: true
      t.jsonb :payload, null: false, default: {}
      t.boolean :synthetic, null: false, default: false
    end
  end
end
