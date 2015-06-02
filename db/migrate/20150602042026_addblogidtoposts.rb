class Addblogidtoposts < ActiveRecord::Migration
  def change
    add_column :posts, :bloga_id, :integer
  end
end
