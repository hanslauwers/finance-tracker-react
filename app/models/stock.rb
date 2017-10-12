class Stock < ActiveRecord::Base
  has_many :user_stocks
  has_many :users, through: :user_stocks
  
  def show
  
  end

  def self.find_by_ticker(ticker_symbol)
    where(ticker: ticker_symbol).first
  end
  
  def self.new_from_lookup(ticker_symbol)
    looked_up_stock = StockQuote::Stock.quote(ticker_symbol)
    return nil unless looked_up_stock.name
    
    new_stock = new(ticker: looked_up_stock.symbol, name: looked_up_stock.name)
    new_stock.last_price = new_stock.price
    new_stock
  end
  
  def price
    closing_price = StockQuote::Stock.quote(ticker).close
    return "#{closing_price} (Closing)" if closing_price
    
    opening_price = StockQuote::Stock.quote(ticker).open
    return "#{opening_price} (Opening)" if opening_price
    
    "Unavailable"
  end
  
  def get_feed_entries_for_stock
    if(name)
      url = "https://news.google.com/news/rss/search/section/q/#{name}/#{name}?hl=en&ned=us".gsub(' ', '%20')
      feed = Feedjira::Feed.fetch_and_parse(url)
      feed.entries = feed.entries[0 .. 10]
      feed.entries
    else
      return nil
    end
  end
  
end
