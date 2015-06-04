# == Route Map
#
#     Prefix Verb   URI Pattern                    Controller#Action
#       root GET    /                              pages#index
#      login GET    /login(.:format)               session#new
#            POST   /login(.:format)               session#create
#            DELETE /login(.:format)               session#destroy
#            GET    /blogs/:id/favorite(.:format)  blogs#favorite
#            POST   /users/:id/fav_blog(.:format)  users#fav_blog
#            POST   /users/:id/fav_post(.:format)  users#fav_post
#            GET    /users/:id/fav_posts(.:format) users#fav_posts
#    myblogs GET    /pages/myblogs(.:format)       pages#myblogs
#     myfavs GET    /pages/myfavs(.:format)        pages#myfavs
#      blogs GET    /blogs(.:format)               blogs#index
#            POST   /blogs(.:format)               blogs#create
#   new_blog GET    /blogs/new(.:format)           blogs#new
#  edit_blog GET    /blogs/:id/edit(.:format)      blogs#edit
#       blog GET    /blogs/:id(.:format)           blogs#show
#            PATCH  /blogs/:id(.:format)           blogs#update
#            PUT    /blogs/:id(.:format)           blogs#update
#            DELETE /blogs/:id(.:format)           blogs#destroy
#      posts GET    /posts(.:format)               posts#index
#            POST   /posts(.:format)               posts#create
#   new_post GET    /posts/new(.:format)           posts#new
#  edit_post GET    /posts/:id/edit(.:format)      posts#edit
#       post GET    /posts/:id(.:format)           posts#show
#            PATCH  /posts/:id(.:format)           posts#update
#            PUT    /posts/:id(.:format)           posts#update
#            DELETE /posts/:id(.:format)           posts#destroy
# edit_users GET    /users/edit(.:format)          users#edit
#      users GET    /users(.:format)               users#index
#            POST   /users(.:format)               users#create
#   new_user GET    /users/new(.:format)           users#new
#       user PATCH  /users/:id(.:format)           users#update
#            PUT    /users/:id(.:format)           users#update
#            DELETE /users/:id(.:format)           users#destroy
#

Rails.application.routes.draw do
  root 'pages#index'

  # get '/pages/test' => 'pages#test'
  # get '/pages/test2' => 'pages#test2'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  get '/blogs/:id/favorite/' => 'blogs#favorite'

  post '/users/:id/fav_blog' => 'users#fav_blog'
  
  post '/users/:id/fav_post' => 'users#fav_post'

  get '/users/:id/fav_posts' => 'users#fav_posts'

  get '/pages/myblogs' => 'pages#myblogs', :as => :myblogs
  get '/pages/myfavs' => 'pages#myfavs', :as => :myfavs

  resources :blogs
  resources :posts

  resources :users, :except => [:edit, :show] do # except has to be an array
    collection do
      get '/edit' => 'users#edit'
    end
  end
end
