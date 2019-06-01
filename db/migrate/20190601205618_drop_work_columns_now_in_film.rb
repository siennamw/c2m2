class DropWorkColumnsNowInFilm < ActiveRecord::Migration[5.1]
  def change
    remove_column :works, :title, :string, null: false
    remove_column :works, :secondary_title, :string
    remove_column :works, :alias_alternates, :text

    remove_column :works, :year, :integer, null: false

    remove_reference :works, :country, optional: true
    remove_reference :works, :media_type

    drop_join_table :composers, :works
    drop_join_table :composers, :works, table_name: :orchestrators_works
    drop_join_table :directors, :works
    drop_join_table :production_companies, :works
  end
end
