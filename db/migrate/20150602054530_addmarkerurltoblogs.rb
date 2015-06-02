class Addmarkerurltoblogs < ActiveRecord::Migration
  def change
    add_column :blogs, :marker_url, :text
  end
end
