Rails.application.routes.draw do
  
  devise_for :users, :controllers => { :registrations => 'user/registrations' }

  resources :user_stocks, except: [:edit, :update, :show, :create, :destroy]
  resources :users, only: [:show]
  resources :stocks, only: [:show]
  resources :friendships
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
  root 'users#my_portfolio'
  # get 'my_portfolio', to: 'users#my_portfolio'
  get 'my_friends', to: 'users#my_friends'
  get 'search_friends', to: 'users#search'
  post 'add_friend', to: 'users#add_friend'
  
  get 'search_stocks', to: 'stocks#search'
  post 'add_stock', to: 'user_stocks#create'
  delete 'delete_stock', to: 'user_stocks#destroy'

  
end
