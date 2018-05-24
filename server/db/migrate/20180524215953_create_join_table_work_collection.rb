class CreateJoinTableWorkCollection < ActiveRecord::Migration[5.1]
  def change
    create_join_table :works, :collections do |t|
      t.index [:work_id, :collection_id], name: 'index_coll_works_on_work_id_and_coll_id'
      t.index [:collection_id, :work_id], name: 'index_coll_works_on_coll_id_and_work_id'
    end
  end
end
