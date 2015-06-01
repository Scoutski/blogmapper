class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :name
      t.date :published
      t.text :post_url
      t.string :restaurant_name
      t.text :restaurant_loc
      t.timestamps
    end
  end
end
