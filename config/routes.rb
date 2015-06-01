# == Route Map
#
#     Prefix Verb   URI Pattern           Controller#Action
#       root GET    /                     pages#index
#      login GET    /login(.:format)      session#new
#            POST   /login(.:format)      session#create
#            DELETE /login(.:format)      session#destroy
# edit_users GET    /users/edit(.:format) users#edit
#      users GET    /users(.:format)      users#index
#            POST   /users(.:format)      users#create
#   new_user GET    /users/new(.:format)  users#new
#       user PATCH  /users/:id(.:format)  users#update
#            PUT    /users/:id(.:format)  users#update
#            DELETE /users/:id(.:format)  users#destroy
#

Rails.application.routes.draw do
  root 'pages#index'

  get '/login' => 'session#new'
  post '/login' => 'session#create'
  delete '/login' => 'session#destroy'

  resources :users, :except => [:edit, :show] do # except has to be an array
    collection do
      get '/edit' => 'users#edit'
    end
  end
end
