class Car < ApplicationRecord

  validates :name, :make, :color, :model, presence: true
  validates :name, uniqueness: true
end
