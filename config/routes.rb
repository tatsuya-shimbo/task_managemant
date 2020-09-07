Rails.application.routes.draw do
  root to: 'toppages#index'

  resources :todos, only: [:index] do
    collection do
      post :add
      post :achieve
    end
  end

  resources :wannas, only: [:index] do
    collection do
      post :add
      post :achieve
    end
  end

  resources :shoppings, only: [:index] do
    collection do
      post :add
      post :achieve
    end
  end

  resources :goals, only: [:index, :destroy] do
    collection do
      post :add
      post :achieve
    end
  end

  resources :dairies
end
