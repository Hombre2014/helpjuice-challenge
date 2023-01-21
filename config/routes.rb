Rails.application.routes.draw do
  root 'home#index'
  namespace :api do
    namespace :v1 do
      resources :lines, only: [:index, :create] do
        member do
          put :update_content
        end
      end
    end
  end
end
