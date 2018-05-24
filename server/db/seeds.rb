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
               { name: 'United Kingdom' },
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

MaterialFormat.create([
                      { name: 'Manuscript Scores' },
                      { name: 'Printed Scores and Parts' },
                      { name: 'Short Scores' },
                      { name: 'Sketches' },
                      { name: 'Published Scores or Collections' },
                      { name: 'Cue Sheets' },
                      { name: 'Working Notes' },
                      { name: 'Recordings' },
                      { name: 'Contracts' },
                      { name: 'Personal Papers and Other Items' },
                      ])

Cataloger.create([
                 { name: 'Michael W. Harris', email: 'michaelwharris1980@gmail.com ' },
                 { name: 'Sienna M. Wood', email: 'sienna.m.wood@gmail.com' },
                 ])

Composer.create([
                { name: 'Broughton, Bruce, 1945-', imdb_link: 'http://www.imdb.com/name/nm0005976/' },
                { name: 'Davis, Don, 1957-', imdb_link: 'http://www.imdb.com/name/nm0204485/' },
                { name: 'Elfman, Danny', imdb_link: 'http://www.imdb.com/name/nm0000384/' },
                { name: 'Horner, James', imdb_link: 'http://www.imdb.com/name/nm0000035/' },
                { name: 'Silvestri, Alan', imdb_link: 'http://www.imdb.com/name/nm0006293/' },
                { name: 'Hayasaka, Fumio, 1914-1955', imdb_link: 'http://www.imdb.com/name/nm0370593/' },
                { name: 'Grusin, Dave', imdb_link: 'http://www.imdb.com/name/nm0006115/'},
                { name: 'Jarre, Maurice', imdb_link: 'http://www.imdb.com/name/nm0003574/'},
                ])
