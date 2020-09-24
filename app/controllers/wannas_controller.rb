class WannasController < ApplicationController
  before_action :require_login, only: [:add, :achieve]

  def index
    @wannas = Wanna.where.not(value: nil).order(:updated_at)
  end

  def add
    wanna_add = Wanna.where(value: nil).limit(1)
    if wanna_add.update(value: wanna_params[:add_value])
      redirect_back(fallback_location: root_path)
    else
      redirect_back(fallback_location: root_path)
    end
  end

  def achieve
    achieve_num = wanna_params[:achieve_num]
    Wanna.find(achieve_num).update(value: nil)
    redirect_back(fallback_location: root_path)
  end


  def wanna_params
    params.require(:wanna).permit(:achieve_num, :add_value)
  end
end
