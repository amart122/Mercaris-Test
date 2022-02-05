Rails.application.routes.draw do
  root 'graphs/#index'
  resources :graphs, only: [:new, :create, :index, :show]
end
