class TodosController < ApplicationController
  def index
    @todos = Todo.where.not(value: nil).order(:updated_at)
  end


  def add
    todo_add = Todo.where(value: nil).limit(1)
    if todo_params[:add_bydate] == "1"
      if todo_add.update(value: todo_params[:add_value], bydate: nil)
        redirect_back(fallback_location: root_path)
      else
        render "toppages/index"
      end
    else
      if todo_add.update(value: todo_params[:add_value], bydate: todo_params[:add_bydate])
        redirect_back(fallback_location: root_path)
      else
        render "toppages/index"
      end
    end

  end

  def achieve
    achieve_num = todo_params[:achieve_num]
    Todo.find(achieve_num).update(value: nil, bydate: nil)
    redirect_back(fallback_location: root_path)
  end

  def todo_params
    params.require(:todo).permit(:achieve_num, :add_value, :add_bydate)
  end
end
