# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

lines = Line.create([
  {
    content: "I'm a line of text",
    header: true
  },
  {
    content: "I'm another line of text",
    header: false
  }
])
