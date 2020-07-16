class ShoppingsController < ApplicationController
  def index
    @shoppings = Shopping.where.not(value: nil).order(:updated_at)
  end

  def add
    shopping_add = Shopping.where(value: nil).limit(1)
    if shopping_add.update(value: shopping_params[:add_value])
      redirect_back(fallback_location: root_path)
    else
      redirect_back(fallback_location: root_path)
    end
  end

  def achieve
    achieve_num = shopping_params[:achieve_num]
    Shopping.find(achieve_num).update(value: nil)
    redirect_back(fallback_location: root_path)
  end

  def shopping_params
    params.require(:shopping).permit(:achieve_num, :add_value)
  end
end
