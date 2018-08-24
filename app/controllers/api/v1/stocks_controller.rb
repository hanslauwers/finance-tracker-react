class Api::V1::StocksController < Api::V1::ApplicationController
  before_action :authenticate_user_from_token!

  def search
    if params[:stock]
      @stock = Stock.find_by_ticker(params[:stock])
      @stock ||= Stock.new_from_lookup(params[:stock])
    end

    if @stock

      user = User.find_by(email:params[:user_email])

      stock_json = {}
      stock_json[:id] = @stock.id
      stock_json[:ticker] = @stock.ticker
      stock_json[:name] = @stock.name
      stock_json[:last_price] = @stock.price
      stock_json[:can_add_stock]= user.can_add_stock?(@stock.ticker)
      stock_json[:under_stock_limit] = user.under_stock_limit?
      stock_json[:stock_already_added] = user.stock_already_added?(@stock.ticker)
      render json: stock_json
      #render json: @stock
    else
      render json: {}
    end
  end

  private

  def stock_params
    params.require(:stock).permit(:name)
  end
end