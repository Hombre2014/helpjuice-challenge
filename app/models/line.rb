class Line < ApplicationRecord
  validates :content, presence: true
  validates :header, inclusion: { in: [true, false] }
end
