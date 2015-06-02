class Addblogspoststousers < ActiveRecord::Migration
  def change
    add_column :users, :fav_posts, :integer, array: true
    add_column :users, :fav_blogs, :integer, array: true
  end
end
