class UrlFormatValidator < ActiveModel::EachValidator  
  def validate_each(object, attribute, value)  
    
    if !(value =~ /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/ix) && value != ""
      value = "http://" + value
    end 
    
    unless ((value =~ /^(http|https):\/\/[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(([0-9]{1,5})?\/.*)?$/ix) || value == "")  
      object.errors[attribute] << (options[:message] || "is not a valid URL. Please use this format: http://www.yoursite.com")  
    end  
  end  
end

