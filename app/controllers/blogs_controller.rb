class BlogsController < ApplicationController
  
  before_action :check_if_admin, :only => [:new, :edit]
  def index
    @blogs = Blog.all
  end

  def new
    @blog = Blog.new
  end

  def create
    @blog = Blog.new blog_params
    if @blog.save
      redirect_to root_path
    else
      render :new
    end
  end

  def show
    @blog = Blog.find params[:id]
  end

  def edit
    @blog = Blog.find params[:id]
  end

  def update
    blog = Blog.find params[:id]
    blog.update blog_params
    redirect_to root_path
  end

  def favorite
    id = params[:id]
    if @current_user
      if @current_user.fav_blogs.index(id).nil?
        result = 'Follow Blog'
      else
        result = 'Unfollow Blog'
      end 
    else
      result = 'Sign Up To Follow'
    end
    respond_to do |format|
      format.all { render :text => result }
    end
  end

  def destroy
  end

  private
    def blog_params
      params.require(:blog).permit(:name, :blog_url, :marker_url)
    end

    def check_if_admin
      redirect_to root_path unless @current_user.present? && @current_user.admin?
    end
end
