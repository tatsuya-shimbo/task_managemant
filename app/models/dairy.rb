class Dairy < ApplicationRecord
  validates :title, length: { maximum: 50 }, presence: true
  validates :year, length: { is: 4 }, presence: true
  validates :month, length: { maximum: 2 }, presence: true
  validates :day, length: { maximum: 2 }, presence: true
end
