class DealsController < ApplicationController

    # Implementing the below line of code when looking at data in Postman
    skip_before_action :authorize
    
    def index 
        render json: Deal.all
    end

    def show 
        deal = Deal.find(params[:id])
        render json: deal 
    end 

    def create 
        deal = Deal.create!(deal_params)
        render json: deal, status: :created
    end

    def destroy 
        deal = Deal.find(params[:id])
        deal.destroy
        render json: {}
    end

    def update
        deal = Deal.find(params[:id])
        deal.update!(deal_params)
        render json: deal, status: :ok
    end



    private 

    def deal_params 
        params.permit(:deal_name, :deal_stage, :amount, :user_id, :contact_id)
    end

    def update_deal_params 
        params.permit(:deal_name, :deal_stage, :amount, :user_id, :contact_id)
    end
end
