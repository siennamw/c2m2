class YearOptionalRange < ActiveRecord::Migration[6.1]
  def up
    rename_column :works, :year, :year_start
    change_column_null :works, :year_start, true
    add_column :works, :year_end, :integer

    Work.update_all('year_end = year_start')
  end

  def down
    rename_column :works, :year_start, :year
    change_column_null :works, :year_start, false
  end
end
