class Goal < ApplicationRecord
  validates :category, length: { maximum: 3 }, presence: true
  validates :value, length: { maximum: 100 }, presence: true
  validates :date, length: { is: 8 }, allow_nil: true
  validates :comment, length: { maximum: 255 }, presence: true, allow_nil: true
end
