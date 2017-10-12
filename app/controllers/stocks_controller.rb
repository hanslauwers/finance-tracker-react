class StocksController < ApplicationController
  
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
      render partial: 'lookup'
    else
      render status: :not_found, nothing: true
    end
  end
  
  private
  
  def stock_params
    params.require(:stock).permit(:name)
  end
  
end