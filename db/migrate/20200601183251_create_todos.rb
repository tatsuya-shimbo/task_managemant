class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      t.string :bydate
      t.string :value

      t.timestamps
    end
  end
end
