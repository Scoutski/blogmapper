class Removecolumnsfromblogs < ActiveRecord::Migration
  def change
    remove_column :blogs, :image_url
    remove_column :blogs, :category
  end
end
