class CreateJoinTableWorkDirector < ActiveRecord::Migration[5.1]
  def change
    create_join_table :works, :directors do |t|
      t.index [:work_id, :director_id]
      t.index [:director_id, :work_id]
    end
  end
end
