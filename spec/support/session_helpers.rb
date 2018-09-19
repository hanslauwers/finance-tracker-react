module SessionHelpers

  def decoded_jwt_token_from_response(response)
    encoded_token = String.new(response.header["Authorization"])
    encoded_token.sub!("Bearer ", "")
    JWT.decode(encoded_token, ENV.fetch("DEVISE_JWT_SECRET_KEY"))
  end
end