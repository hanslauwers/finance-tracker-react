module AuthenticationHandling
  extend ActiveSupport::Concern

  def handle_not_logged_in
    debugger
    redirect_to(new_user_session_path) unless current_user
  end

  def authenticate_user_from_token!
    begin
      jwt_token = request.headers['Authorization'].gsub('Bearer ', '')
      decoded_token = JWT.decode(jwt_token,ENV.fetch("DEVISE_JWT_SECRET_KEY"))[0]
      # Verify the user using the UUID in the decoded token.
      @current_user = @user = User.find_by!(decoded_token["sub"])
    rescue
      render(json: { error: "Could not verify token. Please log in again." }, status: 401)
    end
  end
end