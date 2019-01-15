class CreateWorks < ActiveRecord::Migration[5.1]
  def change
    create_table :works do |t|
      t.string :title, null: false
      t.string :secondary_title
      t.integer :year
      t.string :finding_aid_link
      t.string :digital_copy_link
      t.string :rights_holder

      t.text :citation_source
      t.text :alias_alternates
      t.text :cataloging_notes

      t.belongs_to :country, optional: true
      t.belongs_to :media_type
      t.belongs_to :material_format
      t.belongs_to :cataloger

      t.timestamps
    end
  end
end
