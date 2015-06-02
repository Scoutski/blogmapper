class Addlatlngtoposts < ActiveRecord::Migration
  def change
    add_column :posts, :latitude, :text
    add_column :posts, :longitude, :text
  end
end
