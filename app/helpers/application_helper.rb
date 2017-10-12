module ApplicationHelper
  require 'date'
  
  def parse_date_time(date_time)
    return date_time.to_formatted_s(:long_ordinal)
  end
  
end
