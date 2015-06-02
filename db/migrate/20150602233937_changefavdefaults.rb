class Changefavdefaults < ActiveRecord::Migration
  def change
    change_column_default :users, :fav_posts, []
    change_column_default :users, :fav_blogs, []
  end
end
