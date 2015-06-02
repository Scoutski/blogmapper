class Addimagetoblogs < ActiveRecord::Migration
  def change
    add_column :blogs, :image_url, :text
  end
end
