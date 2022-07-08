class CompaniesController < ApplicationController

    # Implementing the below line of code when looking at data in Postman
    skip_before_action :authorize
    
    def index 
        render json: Company.all
    end

    def show 
        company = Company.find(params[:id])
        render json: company
    end 

    def create 
        company = Company.create!(company_params)
        render json: company, status: :created
    end

    def destroy 
        company = Company.find(params[:id])
        company.destroy
        render json: {}
    end

    def update
        company = Company.find(params[:id])
        company.update!(company_params)
        render json: company, status: :ok
    end

    private 

    def company_params 
        params.permit(:company_name, :owner_name, :description, :annual_rev, :user_id)
    end

    def update_company_params 
        params.permit(:company_name, :owner_name, :description, :annual_rev)
    end

end
