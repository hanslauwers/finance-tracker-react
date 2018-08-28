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
    user_json["full_name"] = user.full_name
    user_json.delete("authentication_token")
    user_json
  end

end