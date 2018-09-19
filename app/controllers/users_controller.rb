class UsersController < ApplicationController
  include TransformToJson
  
  def my_portfolio
    @user_stocks = current_user.stocks
    @user_stocks.each do |stock|
      stock.update!(last_price: stock.price) unless stock.last_price.to_f == stock.price
    end
    @user = current_user
  end
  
  def my_friends
    @friendships = users_to_json(current_user.friends)
  end
  
  def search
    @users = User.search(params[:search_param])
    if @users
      @users = current_user.except_current_user(@users)
      render partial: 'friends/lookup'
    else
      render status: :not_found, nothing: true
    end
  end
  
  def add_friend
    @friend = User.find(params[:friend])
    current_user.friendships.build(friend_id: @friend.id)
    
    if current_user.save
      flash[:notice] = "Friend was successfully added"
      redirect_to my_friends_path
    else
      flash[:error] = "An error occurred while adding user as a friend"
      redirect_to my_friends_path
    end
  end
  
  def show
    @user = User.find(params[:id])
    @user_stocks = @user.stocks
  end
end