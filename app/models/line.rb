class Line < ApplicationRecord
  validates :content, presence: true
  validates :header, inclusion: { in: [1, 0] }
end
