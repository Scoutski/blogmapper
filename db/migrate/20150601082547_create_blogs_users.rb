class CreateBlogsUsers < ActiveRecord::Migration
  def change
    create_table :blogs_users, :id => false do |t|
      t.integer :blog_id
      t.integer :user_id
    end
  end
end
