class AddFieldsToCars < ActiveRecord::Migration[5.1]
  def change
    add_column :cars, :addons, :string
    add_column :cars, :follow_up_tags, :string
  end
end
