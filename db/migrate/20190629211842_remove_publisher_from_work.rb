class RemovePublisherFromWork < ActiveRecord::Migration[5.1]
  def change
    drop_table :publishers
    drop_table :publishers_works
  end
end
