# == Schema Information
#
# Table name: users
#
#  id              :integer          not null, primary key
#  name            :text
#  password_digest :string
#  admin           :boolean          default(FALSE)
#  created_at      :datetime
#  updated_at      :datetime
#

class User < ActiveRecord::Base
  has_and_belongs_to_many :posts
  has_and_belongs_to_many :blogs
  has_secure_password
  
  validates :name, :presence => true, :uniqueness => true
end
