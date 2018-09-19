class StockPricesWorker
  include Sidekiq::Worker

  def perform(*args)
    Stock.all.each do |stock|
      unless stock.last_price.to_f == stock.price
        stock.update!(last_price: stock.price) 
        puts "Stockprice of #{stock.name} was updated"
      end
    end
  end
end
