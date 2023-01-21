Rails.application.routes.draw do
  root 'home#index'
  namespace :api do
    namespace :v1 do
      resources :lines, only: [:index, :show, :create, :update, :destroy]
    end
  end
end
