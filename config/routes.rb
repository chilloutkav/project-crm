Rails.application.routes.draw do
  resources :companies
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  resources :users, only: [:create, :show]

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  
  get "/me", to: "users#show"
  delete "logout", to: "sessions#destroy"

  get '*path',
      to: 'fallback#index',
      constraints: ->(req) { !req.xhr? && req.format.html? }
end
