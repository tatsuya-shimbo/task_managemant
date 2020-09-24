class DairiesController < ApplicationController
    before_action :require_login, only: [:create, :destroy, :update]

  def index
    @year_count = Dairy.last
    if !!@year_count
      @year_count = @year_count.year.to_i - 2018
    else
      @year_count = 0
    end
  end

  def show
    @dairy = Dairy.find(params[:id])
  end

  def new
    @dairy = Dairy.new()
  end

  def create
    @dairy = Dairy.new(dairies_params)
    if create_check(dairies_params[:year], dairies_params[:month], dairies_params[:day])
      if @dairy.save
        redirect_to dairies_path
      else
        render :new
      end
    else
      render :new
    end
  end

  def edit
    @dairy = Dairy.find(params[:id])
  end

  def update
    @dairy = Dairy.find(params[:id])
    if edit_check(dairies_params[:year], dairies_params[:month], dairies_params[:day])
      if @dairy.update(dairies_params)
        redirect_to dairies_path
      else
        render :edit
      end
    else
      render :edit
    end
  end

  def destroy
    @dairy = Dairy.find(params[:id]).destroy
    redirect_to dairies_path
  end

  def dairies_params
    params.require(:dairy).permit(:year, :month, :day, :title, :text)
  end

  def create_check(a, b, c)
    @dairies_check = Dairy.where(year: a, month: b, day: c)
    return !@dairies_check.present?
  end

  def edit_check(a, b, c)
    @dairies_check = Dairy.where(year: a, month: b, day: c)
    if @dairies_check.size == 1
      return true
    else
      return false
    end

  end
end
