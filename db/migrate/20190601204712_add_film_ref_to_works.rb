class AddFilmRefToWorks < ActiveRecord::Migration[5.1]
  def change
    add_reference :works, :film, foreign_key: true
  end
end
