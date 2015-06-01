class CreateBlogs < ActiveRecord::Migration
  def change
    create_table :blogs do |t|
      t.string :name
      t.text :blog_url
      t.string :category
      t.timestamps
    end
  end
end
