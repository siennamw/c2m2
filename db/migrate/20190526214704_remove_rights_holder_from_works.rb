class RemoveRightsHolderFromWorks < ActiveRecord::Migration[5.1]
  def change
    remove_column :works, :rights_holder
  end
end
