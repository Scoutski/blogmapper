# == Schema Information
#
# Table name: blogs
#
#  id         :integer          not null, primary key
#  name       :string
#  blog_url   :text
#  category   :string
#  created_at :datetime
#  updated_at :datetime
#  image_url  :text
#

class Blog < ActiveRecord::Base
  has_many :posts
  has_and_belongs_to_many :users
end
