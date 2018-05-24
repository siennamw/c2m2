class CreateJoinTableWorkProductionCompany < ActiveRecord::Migration[5.1]
  def change
    create_join_table :works, :production_companies do |t|
      t.index [:work_id, :production_company_id], name: 'index_pcs_works_on_work_id_and_pc_id'
      t.index [:production_company_id, :work_id], name: 'index_pcs_works_on_pc_id_and_work_id'
    end
  end
end
