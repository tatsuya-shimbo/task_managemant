class Todo < ApplicationRecord
  validates :bydate, length: { is: 12 }, allow_nil: true
  validates :value, length: { maximum: 100 }
end
