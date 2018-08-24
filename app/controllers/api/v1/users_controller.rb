class Api::V1::UsersController < Api::V1::ApplicationController

  def search
    @users = User.search(params[:search_param])
    if @users
      @users = current_user.except_current_user(@users)
      render json: @users
    else
      render json: {}
    end
  end
end
