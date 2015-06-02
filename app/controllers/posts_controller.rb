class PostsController < ApplicationController
  
  before_action :check_if_admin, :only => [:new, :edit]
  def index
    @posts = Post.all
  end

  def new
    @post = Post.new
  end

  def create
    @post = Post.new post_params
    if @post.save
      @post.latitude = Geocoder.search(@post.restaurant_loc)[0].geometry['location']['lat']
      @post.longitude = Geocoder.search(@post.restaurant_loc)[0].geometry['location']['lng']     
      @post.save
      redirect_to root_path
    else
      render :new
    end
  end

  def show
    @post = Post.find params[:id]
  end

  def edit
    @post = Post.find params[:id]
  end

  def update
    post = Post.find params[:id]
    post.update post_params
    post.latitude = Geocoder.search(post.restaurant_loc)[0].geometry['location']['lat']
    post.longitude = Geocoder.search(post.restaurant_loc)[0].geometry['location']['lng']     
    post.save
    redirect_to post_path
  end

  def destroy
  end

  private
    def post_params
      params.require(:post).permit(:name, :published, :post_url, :restaurant_name, :restaurant_loc, :blog_id)
    end

    def check_if_admin
      redirect_to root_path unless @current_user.present? && @current_user.admin?
    end
end
