class CreateGoals < ActiveRecord::Migration[5.2]
  def change
    create_table :goals do |t|
      t.string :category
      t.string :value
      t.string :date
      t.string :comment

      t.timestamps
    end
  end
end
