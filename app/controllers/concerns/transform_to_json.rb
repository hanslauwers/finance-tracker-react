module TransformToJson
  extend ActiveSupport::Concern

  def users_to_json(users)
    users_json = Array.new
    users.each do |user|
      users_json << user_to_json(user)
    end
    users_json
  end

  def user_to_json(user)
    user_json = user.as_json
    user_json['full_name'] = user.full_name
    user_json.delete('authentication_token')
    user_json
  end

  def stocks_for_user_to_json(user, stock)
    stock_json = stock.as_json
    stock_json['last_price'] = stock.price
    stock_json['can_add_stock']= user.can_add_stock?(stock.ticker)
    stock_json['under_stock_limit'] = user.under_stock_limit?
    stock_json['stock_already_added'] = user.stock_already_added?(stock.ticker)
    stock_json
  end
end