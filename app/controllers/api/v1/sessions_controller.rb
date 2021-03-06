class Api::V1::SessionsController < Devise::SessionsController
  respond_to :json
  protect_from_forgery except: :create
  
  private

  def respond_with(resource, _opts = {})
    token = request.headers['warden-jwt_auth.token']
    result = resource.as_json
    result["auth-token"] = 'Bearer ' + token
    render json: result
  end

  def respond_to_on_destroy
    head :no_content
  end
end
