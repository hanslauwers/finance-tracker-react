class Api::V1::ApplicationController < ActionController::API
  respond_to :json
  before_action :authenticate_user!


end