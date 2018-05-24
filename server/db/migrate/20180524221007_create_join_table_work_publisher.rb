class CreateJoinTableWorkPublisher < ActiveRecord::Migration[5.1]
  def change
    create_join_table :works, :publishers do |t|
      t.index [:work_id, :publisher_id]
      t.index [:publisher_id, :work_id]
    end
  end
end
