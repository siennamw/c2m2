# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Country.create([
               { name: 'United States' },
               { name: 'Japan' },
               { name: 'United Kingdom' }
               ])

MediaType.create([
                 { name: 'Feature Film - Narrative' },
                 { name: 'Feature Film - Documentary/Other' },
                 { name: 'Short Film - Narrative' },
                 { name: 'Short Film - Documentary/Other' },
                 { name: 'Silent Film - Feature, Short, or Photoplay' },
                 { name: 'Serial Series - Narrative' },
                 { name: 'Serial Series - Documentary/Other' },
                 { name: 'Serial Series - Information/Education' },
                 { name: 'Video Game' },
                 { name: 'Radio or Podcast' },
                 ])
