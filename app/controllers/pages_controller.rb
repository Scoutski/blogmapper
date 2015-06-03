class PagesController < ApplicationController
  def index
    gon.blogs = Blog.all
    gon.posts = Post.all
    @blogs = Blog.all
  end

  def test 
    @post = Post.find 2
    render :layout => false
  end

  def test2
    @post = Post.find 2
    render :layout => false
  end
end
