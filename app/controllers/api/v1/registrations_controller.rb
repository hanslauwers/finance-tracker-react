class Api::V1::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  include ErrorHandling

  def create
    build_resource(sign_up_params)
    if resource.save!
      render json: resource
    else
      validation_error(resource)
    end
  end

  private

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :first_name, :last_name)
  end

  def validation_error(resource)
    render json: {
      errors: [
        {
          status: '400',
          title: 'Bad Request',
          detail: resource.errors,
          code: '100'
        }
      ]
    }, status: :bad_request
  end
end