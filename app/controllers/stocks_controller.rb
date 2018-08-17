class StocksController < ApplicationController
  before_action :authenticate_user!, except: [:search]

  def show
    @stock = Stock.find(params[:id])
    @stock_feed_entries = @stock.get_feed_entries_for_stock
  end

  def search
    if params[:stock]
      @stock = Stock.find_by_ticker(params[:stock])
      @stock ||= Stock.new_from_lookup(params[:stock])
    end

    if @stock

      user = User.find(params[:current_user_id])

      stock_json = {}
      stock_json[:id] = @stock.id
      stock_json[:ticker] = @stock.ticker
      stock_json[:name] = @stock.name
      stock_json[:last_price] = @stock.last_price
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
