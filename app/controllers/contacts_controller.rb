class ContactsController < ApplicationController

    # Implementing the below line of code when looking at data in Postman
    skip_before_action :authorize
    
    def index 
        render json: Contact.all
    end

    def show 
        contact = Contact.find(params[:id])
        render json: contact
    end 

    def create 
        contact = Contact.create!(contact_params)
        render json: contact, status: :created
    end

    def destroy 
        contact = Contact.find(params[:id])
        contact.destroy
        render json: {}
    end

    def update
        contact = Contact.find(params[:id])
        contact.update!(contact_params)
        render json: contact, status: :ok
    end

    private 

    def contact_params 
        params.permit(:name, :email, :image_url, :company, :job_title, :user_id)
    end

    def update_contact_params 
        params.permit(:name, :email, :image_url, :company, :job_title, :user_id)
    end
end
