class MakeYearRequiredInWork < ActiveRecord::Migration[5.1]
  def change
    change_column_null :works, :year, false
  end
end
