class Api::V1::UserStocksController < Api::V1::ApplicationController

  # POST /user_stocks
  # POST /user_stocks.json
  def create
    user = User.find_by(email: params[:user_email])
    if params[:stock_id].present?
      @user_stock = UserStock.new(stock_id: params[:stock_id],
                                  user: user)
    else
      stock = Stock.find_by_ticker(params[:stock_ticker])
      if stock
        @user_stock = UserStock.new(stock: stock, user: user)
      else
        stock = Stock.new_from_lookup(params[:stock_ticker])
        if stock.save
          @user_stock = UserStock.new(stock: stock, user: user)
        else
          @user_stock = nil
        end
      end
    end

    if @user_stock.save
      render json: @user_stock.stock, notice: 'Stock was successfully added.'
    else
      render json: @user_stock.errors, status: :unprocessable_entity
    end
  end

  def destroy
    user_stock = UserStock.find_by(user_id: params[:user_id], stock_id: params[:stock_id])
    user_stock.destroy
    render json: Stock.find(params[:stock_id]), notice: 'Stock was successfully deleted.'
  end

  private

  def user_stock_params
    params.require(:user_stock).permit(:user_id, :stock_id)
  end
end