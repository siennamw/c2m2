class AddOrchestratorToWorks < ActiveRecord::Migration[5.1]
  def change
    create_join_table :composers, :works, table_name: :orchestrators_works do |t|
      t.index [:work_id, :composer_id], name: 'index_orch_works_on_work_id_and_orch_id'
      t.index [:composer_id, :work_id], name: 'index_orch_works_on_orch_id_and_work_id'
    end
  end
end
