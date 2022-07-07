class UsersController < ApplicationController

    #User can create login before authorizing credentials
    skip_before_action :authorize, only: :create

    def create 
        user = User.create!(user_params)
        if user.valid?
            session[:user_id] = user.id
            render json: user, status: :created
       else
            render json: { error: "Invalid user" }, status: 422
       end
    end

    #Finds user by id saved in session hash
    #@current_user defined in the application controller

    def show 
        render json: @current_user
    end

    private

    def user_params 
        params.permit(:first_name, :last_name, :username, :email, :password, :password_confirmation)
    end

end
