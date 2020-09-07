class GoalsController < ApplicationController
  def index
    @goals = Goal.where.not(value: nil);
    @goal_array = ["趣味", "旅行、体験", "食べ物", "勉強、スキル", "人間関係"]
  end

  def add
    if Goal.create(category: goal_params[:add_category], value: goal_params[:add_value])
      redirect_back(fallback_location: root_path)
    else
      redirect_back(fallback_location: root_path)
    end
  end

  def destroy
    Goal.find(params[:id]).destroy
    redirect_back(fallback_location: root_path)
  end

  def achieve
    Goal.find(goal_params[:achieve_num]).update(date: goal_params[:achieve_date], comment: goal_params[:achieve_comment])
    redirect_back(fallback_location: root_path)
  end

  def goal_params
    params.require(:goal).permit(:add_category, :add_value, :destroy_num, :achieve_num, :achieve_date, :achieve_comment)
  end
end
