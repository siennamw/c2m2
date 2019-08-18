class WorkToResource < ActiveRecord::Migration[5.1]
  def change
    rename_table :works, :resources
    rename_column :collections_works, :work_id, :resource_id
    rename_table :collections_works, :collections_resources
  end
end
