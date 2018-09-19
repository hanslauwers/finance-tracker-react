class Api::V1::StocksController < Api::V1::ApplicationController
  include TransformToJson
  

  def search
    user = User.find(params[:user_id])
    if params[:stock]
      @stock = Stock.find_by_ticker(params[:stock])
      @stock ||= Stock.new_from_lookup(params[:stock])
    end

    if @stock
      render json: stock_for_user_to_json(user, @stock)
    else
      render json: {}
    end
  end

  private

  def stock_params
    params.require(:stock).permit(:name)
  end
end