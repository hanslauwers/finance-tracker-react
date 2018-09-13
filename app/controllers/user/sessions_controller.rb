class User::SessionsController < Devise::SessionsController
  skip_before_action :handle_not_logged_in, only: [:new]

end