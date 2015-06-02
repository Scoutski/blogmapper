class BlogsController < ApplicationController
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

  def destroy
  end

  private
    def blog_params
      params.require(:blog).permit(:name, :blog_url, :image_url, :category)
    end
end
