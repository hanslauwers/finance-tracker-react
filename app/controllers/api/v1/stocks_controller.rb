class Api::V1::StocksController < Api::V1::ApplicationController
  include TransformToJson
  
  before_action :authenticate_user_from_token!

  def search
    if params[:stock]
      @stock = Stock.find_by_ticker(params[:stock])
      @stock ||= Stock.new_from_lookup(params[:stock])
    end

    if @stock
      user = User.find_by(email:params[:user_email])
      render json: stocks_for_user_to_json(user, @stock)
    else
      render json: {}
    end
  end

  private

  def stock_params
    params.require(:stock).permit(:name)
  end
end