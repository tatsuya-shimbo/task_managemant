class SessionsController < ApplicationController
  def create
    pass1 = params[:session][:password]
    pass2 = params[:session][:hover]
    if login(pass1, pass2)
      session[:time] = params[:session][:time]
      redirect_back(fallback_location: root_path)
    else
      redirect_back(fallback_location: root_path)
    end
  end

  def destroy
    session[:login] = nil
    session[:time] = nil
    redirect_back(fallback_location: root_path)
  end

  def login(pass1, pass2)
    @pass1 = Code.find(1)
    @pass2 = Code.find(2)
    if @pass1.authenticate(pass1) && @pass2.authenticate(pass2)
      session[:login] = "1"
      return true
    else
      return false
    end
  end
end
