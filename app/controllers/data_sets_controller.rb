class DataSetsController < ApplicationController
    def index

    end

    def new
        
    end

    def create
        redirect_back(fallback_location: new_data_set_path) if data_set_params[:data_set_file].blank?
        new_set = DataSet.create(data_set_params)
        if new_set.present?
            redirect_to data_set_path(new_set.id)
        else
            redirect_back(fallback_location: new_data_set_path)
        end
    end


    private

    def data_set_params
        params.require(:data_set).permit(:name, :data_set_file)
    end
end
