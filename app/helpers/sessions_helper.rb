module SessionsHelper
  def login?
    if session[:login] == "1"
      return true
    else
      return false
    end
  end
end
