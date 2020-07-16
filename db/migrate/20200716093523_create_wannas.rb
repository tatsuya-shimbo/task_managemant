class CreateWannas < ActiveRecord::Migration[5.2]
  def change
    create_table :wannas do |t|
      t.string :value
      t.string :target

      t.timestamps
    end
  end
end
