class NotesController < ApplicationController
        # Implementing the below line of code when looking at data in Postman
        skip_before_action :authorize
    
        def index 
            render json: Note.all
        end
    
        def show 
            note = Note.find(params[:id])
            render json: note 
        end 
    
        def create 
            note = Note.create!(note_params)
            render json: note, status: :created
        end
    
        def destroy 
            note = Note.find(params[:id])
            note.destroy
            render json: {}
        end
    
        def update
            note = Note.find(params[:id])
            note.update!(update_note_params)
            render json: note, status: :ok
        end
    
    
    
        private 
    
        def note_params 
            params.permit(:title, :details, :contact_id)
        end
    
        def update_note_params 
            params.permit(:title, :details)
        end
end
