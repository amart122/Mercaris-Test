Rails.application.routes.draw do
  root to: 'data_sets#index'
  resources :data_sets, only: [:new, :create, :index, :show]
end
