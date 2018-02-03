class CreateCars < ActiveRecord::Migration[5.1]
  def change
    create_table :cars do |t|
      t.string :name
      t.string :make
      t.string :color
      t.string :model

      t.timestamps
    end
  end
end
