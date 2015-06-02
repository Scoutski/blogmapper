# == Schema Information
#
# Table name: posts
#
#  id              :integer          not null, primary key
#  name            :string
#  published       :date
#  post_url        :text
#  restaurant_name :string
#  restaurant_loc  :text
#  created_at      :datetime
#  updated_at      :datetime
#  blog_id         :integer
#  latitude        :text
#  longitude       :text
#

class Post < ActiveRecord::Base
  belongs_to :blog
  has_and_belongs_to_many :users
end
