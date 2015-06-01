Rails.application.routes.draw do
   resources :users, :except => [:edit, :show] do # except has to be an array
    collection do
      get '/edit' => 'users#edit'
    end
  end
end
