class AddOrchestratorsWorksForeignKeys < ActiveRecord::Migration[5.1]
  def change
    add_foreign_key :orchestrators_works, :works
    add_foreign_key :orchestrators_works, :composers
  end
end
