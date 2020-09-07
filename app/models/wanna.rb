class Wanna < ApplicationRecord
  validates :value, length: { maximum: 100 }, presence: true, allow_nil: true
end
