class CreateDairies < ActiveRecord::Migration[5.2]
  def change
    create_table :dairies do |t|
      t.string :year
      t.string :month
      t.string :day
      t.string :title
      t.text :text

      t.timestamps
    end
  end
end
