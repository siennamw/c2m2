class SetIdRanges < ActiveRecord::Migration[5.1]
  def change
    execute "SELECT setval('repositories_id_seq', 100000)"
    execute "SELECT setval('composers_id_seq', 200000)"
    execute "SELECT setval('directors_id_seq', 300000)"
    execute "SELECT setval('production_companies_id_seq', 400000)"
    execute "SELECT setval('publishers_id_seq', 500000)"
  end
end
