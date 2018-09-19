Rails.application.routes.draw do

  require 'sidekiq/web'
  require 'sidekiq/cron/web'
  mount Sidekiq::Web => '/sidekiq'

  namespace :api do
    namespace :v1 do
      devise_scope :user do
        post "/sign_in", to: 'sessions#create'
        post "/sign_up", to: 'registrations#create'
        delete "/sign_out", to: 'sessions#destroy'
        get "/my_stocks", to: 'users#my_stocks'
        get '/search_stocks', to: 'stocks#search'
        post '/add_stock', to: 'user_stocks#create'
        delete '/delete_stock', to: 'user_stocks#destroy'
        get '/search_friends', to: 'users#search'
        post '/add_friend', to: 'users#add_friend'
        delete '/delete_friend', to: 'users#delete_friend'
      end
    end
  end

  devise_for :users, :controllers => { :registrations => 'user/registrations', :sessions => 'user/sessions'  }

  resources :user_stocks, except: [:edit, :update, :show, :create, :destroy]
  resources :users, only: [:show]
  resources :stocks, only: [:show]
  resources :friendships
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'welcome#index'
  # get 'my_portfolio', to: 'users#my_portfolio'
  get 'my_friends', to: 'users#my_friends'


  
end
