class AddFindingAidLinkToCollection < ActiveRecord::Migration[5.1]
  def change
    add_column :collections, :finding_aid_link, :string
    remove_column :resources, :finding_aid_link
  end
end
