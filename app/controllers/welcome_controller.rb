class WelcomeController < ApplicationController
  
  def index
    StockPricesWorker.perform_in(5.seconds)
  end
  
end