class WorksNotNullMediaTypeMaterialFormat < ActiveRecord::Migration[5.1]
  def change
    change_column_null :works, :media_type_id, false
    change_column_null :works, :material_format_id, false
  end
end
