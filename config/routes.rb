Rails.application.routes.draw do
  root 'home#index'
  namespace :api do
    namespace :v1 do
      resources :lines, only: [:index, :create] do
        member do
          patch :update_content
        end
      end
    end
  end
end
