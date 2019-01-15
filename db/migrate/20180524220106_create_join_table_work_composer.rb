class CreateJoinTableWorkComposer < ActiveRecord::Migration[5.1]
  def change
    create_join_table :works, :composers do |t|
      t.index [:work_id, :composer_id]
      t.index [:composer_id, :work_id]
    end
  end
end
