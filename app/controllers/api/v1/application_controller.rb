class Api::V1::ApplicationController < ActionController::API
  include AuthenticationHandling
  
  respond_to :json

  before_action :authenticate_user_from_token!

  

end