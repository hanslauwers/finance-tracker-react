class Api::V1::UsersController < Api::V1::ApplicationController
  include TransformToJson

  def search
    @users = User.search(params[:search_param])
    if @users
      @users = current_user.except_current_user(@users)
      render json: users_to_json(@users)
    else
      render json: {}
    end
  end

  def add_friend
    user = User.find_by(email:params[:user_email])
    user.friendships.build(friend_id: params[:friend])
    friend = User.find(params[:friend])
    
    if user.save
      render json: user_to_json(friend)
    else
      render json: user.errors, status: :unprocessable_entity
    end
  end

  def delete_friend
    user = User.find_by(email:params[:user_email])
    friendship = Friendship.find_by(user_id: user.id, friend_id: params[:friend])
    friendship.destroy
    render json: user_to_json(User.find(params[:friend]))
  end
end
