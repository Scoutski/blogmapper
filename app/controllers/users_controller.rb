class UsersController < ApplicationController
  before_action :check_if_admin, :only => [:index]
  respond_to :html, :js

  # protect_from_forgery with: :exception
  skip_before_filter :verify_authenticity_token, :only => [:fav_post, :fav_blog]


  def index
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new user_params
    if @user.save
      redirect_to root_path
    else
      render :new
    end
  end

  def edit
    @user = @current_user
  end

  def update
    user = @current_user
    user.update user_params
    redirect_to root_path
  end

  def fav_posts
    @post = Post.find params[:id].to_i
    render :layout => false
    end

  def fav_post
    id = params[:id].to_i

    if (@current_user.fav_posts.select { |post| post === id }.any?)
        @current_user.fav_posts.delete(id)
    else
      @current_user.fav_posts.push(id)
    end
    @current_user.save

    respond_to do |format|
      format.all { render :nothing => true }
    end
  end

  def fav_blog
    id = params[:id].to_i

    if (@current_user.fav_blogs.select { |blog| blog === id }.any?)
      @current_user.fav_blogs.delete(id)
    else
      @current_user.fav_blogs.push(id)
    end
    @current_user.save

    respond_to do |format|
      format.all { render :nothing => true }
    end
  end


    private
  def user_params
    params.require(:user).permit(:name, :password, :password_confirmation, :id)
  end

  def check_if_admin
    redirect_to root_path unless @current_user.present? && @current_user.admin?
  end
end
