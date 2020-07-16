class ToppagesController < ApplicationController
  def index
    @todos = Todo.where.not(value: nil).order(:updated_at)
    @shoppings = Shopping.where.not(value: nil).order(:updated_at)
  end
end
