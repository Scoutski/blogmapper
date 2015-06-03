# == Route Map
#
#     Prefix Verb   URI Pattern               Controller#Action
#       root GET    /                         pages#index
#      login GET    /login(.:format)          session#new
#            POST   /login(.:format)          session#create
#            DELETE /login(.:format)          session#destroy
#      blogs GET    /blogs(.:format)          blogs#index
#            POST   /blogs(.:format)          blogs#create
#   new_blog GET    /blogs/new(.:format)      blogs#new
#  edit_blog GET    /blogs/:id/edit(.:format) blogs#edit
#       blog GET    /blogs/:id(.:format)      blogs#show
#            PATCH  /blogs/:id(.:format)      blogs#update
#            PUT    /blogs/:id(.:format)      blogs#update
#            DELETE /blogs/:id(.:format)      blogs#destroy
# edit_users GET    /users/edit(.:format)     users#edit
#      users GET    /users(.:format)          users#index
#            POST   /users(.:format)          users#create
#   new_user GET    /users/new(.:format)      users#new
#       user PATCH  /users/:id(.:format)      users#update
#            PUT    /users/:id(.:format)      users#update
#            DELETE /users/:id(.:format)      users#destroy
#

Rails.application.routes.draw do
  root 'pages#index'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  post '/users/:id/fav_post' => 'users#fav_post'
  get '/users/:id/fav_posts' => 'users#fav_posts'
  
  resources :blogs
  resources :posts

  resources :users, :except => [:edit, :show] do # except has to be an array
    collection do
      get '/edit' => 'users#edit'
    end
  end
end
