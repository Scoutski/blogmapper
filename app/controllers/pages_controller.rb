class PagesController < ApplicationController
  def index
    gon.blogs = Blog.all
    gon.posts = Post.all
    @blogs = Blog.all
  end

  def myblogs
    @user = @current_user
    @blogs = Blog.all
    gon.user = @current_user
    gon.blogs = Blog.all
    gon.posts = Post.all
  end

  def myfavs
    @user = @current_user
    @blogs = Blog.all
    @posts = Post.all
    gon.user = @current_user
    gon.blogs = Blog.all
    gon.posts = Post.all
  end

end