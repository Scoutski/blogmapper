class PagesController < ApplicationController
  def index
    gon.blogs = Blog.all
    gon.posts = Post.all
    @blogs = Blog.all
  end
end
