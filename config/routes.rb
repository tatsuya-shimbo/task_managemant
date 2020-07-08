Rails.application.routes.draw do
  root to: 'toppages#index'

  resources :todos, only: [:index] do
    collection do
      post :add
      post :achieve
    end
  end
end
