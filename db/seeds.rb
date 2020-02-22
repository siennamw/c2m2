# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

# Catalogers - with dummy passwords for development only!!
michael = Cataloger.create(
  admin: true,
  name: 'Michael W. Harris',
  email: 'michael.harris@example.com',
  password: 'password',
)
sienna = Cataloger.create(
  admin: true,
  name: 'Sienna M. Wood',
  email: 'sienna.wood@example.com',
  password: 'password',
  created_by: michael,
)

# Countries
us = Country.create(name: 'United States', created_by: michael)
japan = Country.create(name: 'Japan', created_by: michael)
uk = Country.create(name: 'United Kingdom', created_by: sienna)

# Media Types
ff_narrative = MediaType.create(
  name: 'Feature Film - Narrative',
  description: 'Typical feature-length films that are fictional. These can include adaptations of a true story but that are not documentary in nature (e.g. Jurassic Park).',
  created_by: michael
)
MediaType.create([
  {
    name: 'Feature Film - Documentary/Other',
    description: 'Feature length films that are documentaries, educational, and other films that mix archival footage, interviews, and possibly reenactments (e.g. March of the Penguins).',
    created_by: michael
  },
  {
    name: 'Short Film - Narrative',
    description: 'Short films, typically less than sixty minutes, that are story driven fictional or fictional retellings (e.g. La Jetée).',
    created_by: michael
  },
  {
    name: 'Short Film - Documentary/Other',
    description: 'Short films, typically less than sixty minutes, that are documentaries, educational, and other films that mix archival footage, interviews, and possibly reenactments (e.g. Absence).',
    created_by: michael
  },
  {
    name: 'Silent Film - Feature, Short, or Photoplay',
    description: 'Any type of silent film c. 1930 or earlier. This is also where we will catalog any photoplay music collections that are not associated with a specific film (e.g. Metropolis, or individual cues from photoplay music libraries).',
    created_by: michael
  },
  {
    name: 'Serial Series - Narrative',
    description: 'Serialized series (television, streaming, or internet based) that are fictional. These can include adaptations of a true story but that are not documentary in nature. These can also include broadcast, cable tv, streaming services, YouTube, or other video hosting platform (e.g. Lost or House of Cards).',
    created_by: sienna
  },
  {
    name: 'Serial Series - Documentary/Other',
    description: 'Serialized series (television, streaming, or internet-based) that are documentaries, and other series that mix archival footage, interviews, and possibly reenactments. These can include broadcast, cable tv, streaming services, YouTube, or other video hosting platform (e.g. Nova or Making a Murderer).',
    created_by: sienna
  },
  {
    name: 'Serial Series - Information/Education/Journalistic',
    description: 'Other type of series or show that is informational, informative, news programs, or educational programming (including comedy news shows) and is distributed via broadcast, cable tv, streaming services, YouTube, or other video hosting platform (e.g. 60 Minutes or Last Week Tonight).',
    created_by: sienna
  },
  {
    name: 'Video Game',
    description: 'Any form of interactive electronic game that includes a musical score. These can exist across many types of platforms but must include some form of human-based input (e.g. Final Fantasy or Call of Duty).',
    created_by: sienna
  },
  {
    name: 'Radio or Podcast',
    description: 'Any type of series (narrative, educational, documentary, or other) that exists in a purely audio format (e.g. Radiolab or Welcome to Night Vale).',
    created_by: sienna
  },
])

# Material Formats
manuscript_score = MaterialFormat.create(
  name: 'Manuscript Scores',
  description: 'A composer or orchestrator\'s handwritten full scores.',
  created_by: michael
)
printed_score_parts = MaterialFormat.create(
  name: 'Printed Scores and Parts',
  description: 'Printers\' scores and parts used for performance purposes (either score recording or concert performances).',
  created_by: michael
)
MaterialFormat.create([
  {
    name: 'Short Scores',
    description: 'A composer\'s short score that would eventually be arranged into a full score by the composer or orchestrator.',
    created_by: michael
  },
  {
    name: 'Sketches',
    description: 'Sketches, notes, or other types of early work on a score.',
    created_by: michael
  },
  {
    name: 'Published Scores or Collections',
    description: 'Full scores, arrangements, or other type of derivative work published for a commercial market.',
    created_by: michael
  },
  {
    name: 'Cue Sheets',
    description: 'Sheets detailing music and scene breakdowns for a work.',
    created_by: michael
  },
  {
    name: 'Working Notes',
    description: 'A composer or director’s notes on music, spotting, etc.',
    created_by: sienna
  },
  {
    name: 'Recordings',
    description: 'An audio or video recording made for either the work or produced for a commercial market.',
    created_by: sienna
  },
  {
    name: 'Contracts',
    description: 'Contracts made between a composer and producer or studio for production of the musical work.',
    created_by: sienna
  },
  {
    name: 'Personal Papers and Other Items',
    description: 'Miscellaneous personal items or papers that relate to a composer.',
    created_by: sienna
  },
  {
    name: 'Conductor\'s Scores',
    description: '',
    created_by: sienna
  },
])

# Repositories
harris = Repository.create(
  name: 'Michael W. Harris Family Archive and Arcade Fun Complex',
  location: 'Boulder, CO',
  website: 'http://www.michaelwharris.net/',
  created_by: michael,
)
amrc = Repository.create(
  name: 'American Music Research Center at CU Boulder',
  location: 'Boulder, CO',
  website: 'http://www.colorado.edu/amrc/',
  created_by: sienna,
)
ahc = Repository.create(
  name: 'American Heritage Center at University of Wyoming',
  location: 'Laramie, WY',
  website: 'http://www.uwyo.edu/ahc/',
  created_by: michael,
)
amjm = Repository.create(
  name: 'Archives of Modern Japanese Music at Meiji Gakuin University',
  location: 'Tokyo, Japan',
  website: 'http://www.meijigakuin.ac.jp/library/amjm/en/',
  created_by: sienna,
)

# Collections
harris_collection = Collection.create(
  name: 'Michael W. Harris Collection',
  repository: harris,
  created_by: michael,
)
grusin_collection = Collection.create(
  name: 'Dave Grusin manuscripts',
  finding_aid_link: 'http://www.colorado.edu/amrc/sites/default/files/attached-files/AMRC-Grusin.pdf',
  repository: amrc,
  created_by: sienna,
)
jarre_collection = Collection.create(
  name: 'Maurice Jarre papers',
  finding_aid_link: 'http://www.uwyo.edu/ahc/_files/pdffa/03261.pdf',
  repository: ahc,
  created_by: sienna,
)
hayasaka_collection = Collection.create(
  name: 'Fumio Hayasaka Collection',
  repository: amjm,
  created_by: michael,
)

# Composers
broughton = Composer.create(
  name: 'Broughton, Bruce, 1945-',
  imdb_link: 'http://www.imdb.com/name/nm0005976/',
  created_by: sienna
)
davis = Composer.create(
  name: 'Davis, Don, 1957-',
  imdb_link: 'http://www.imdb.com/name/nm0204485/',
  created_by: sienna
)
elfman = Composer.create(
  name: 'Elfman, Danny',
  imdb_link: 'http://www.imdb.com/name/nm0000384/',
  created_by: sienna
)
horner = Composer.create(
  name: 'Horner, James',
  imdb_link: 'http://www.imdb.com/name/nm0000035/',
  created_by: sienna
)
silvestri = Composer.create(
  name: 'Silvestri, Alan',
  imdb_link: 'http://www.imdb.com/name/nm0006293/',
  created_by: michael
)
hayasaka = Composer.create(
  name: 'Hayasaka, Fumio, 1914-1955',
  imdb_link: 'http://www.imdb.com/name/nm0370593/',
  created_by: michael
)
grusin = Composer.create(
  name: 'Grusin, Dave',
  imdb_link: 'http://www.imdb.com/name/nm0006115/',
  created_by: michael
)
jarre = Composer.create(
  name: 'Jarre, Maurice',
  imdb_link: 'http://www.imdb.com/name/nm0003574/',
  created_by: michael
)

# Directors
kasdan = Director.create(
  name: 'Kasdan, Lawrence, 1949-',
  imdb_link: 'http://www.imdb.com/name/nm0001410/',
  created_by: michael
)
wachowski_lilly = Director.create(
  name: 'Wachowski, Lilly, 1967-',
  imdb_link: 'http://www.imdb.com/name/nm0905152/',
  created_by: michael
)
wachowski_lana = Director.create(
  name: 'Wachowski, Lana, 1965-',
  imdb_link: 'http://www.imdb.com/name/nm0905154/',
  created_by: michael
)
burton = Director.create(
  name: 'Burton, Tim, 1958-',
  imdb_link: 'http://www.imdb.com/name/nm0000318/',
  created_by: michael
)
howard = Director.create(
  name: 'Howard, Ron, 1954-',
  imdb_link: 'http://www.imdb.com/name/nm0000165/',
  created_by: michael
)
zemeckis = Director.create(
  name: 'Zemeckis, Robert, 1952-',
  imdb_link: 'http://www.imdb.com/name/nm0000709/',
  created_by: sienna
)
kurosawa = Director.create(
  name: 'Kurosawa, Akira, 1910-1998',
  imdb_link: 'http://www.imdb.com/name/nm0000041/',
  created_by: sienna
)
donner = Director.create(
  name: 'Donner, Richard',
  imdb_link: 'http://www.imdb.com/name/nm0001149/',
  created_by: sienna
)
lean = Director.create(
  name: 'Lean, David, 1908-1991',
  imdb_link: 'http://www.imdb.com/name/nm0000180/',
  created_by: sienna
)

# Production Companies
columbia = ProductionCompany.create(
  name: 'Columbia Pictures Corporation',
  contact_info: 'http://www.sonypictures.com/',
  created_by: michael
)
warner_bros = ProductionCompany.create(
  name: 'Warner Bros. Pictures (1969- )',
  contact_info: 'http://www.warnerbros.com/',
  created_by: michael
)
village_roadshow = ProductionCompany.create(
  name: 'Village Roadshow Pictures',
  contact_info: 'http://vreg.com/',
  created_by: michael
)
fox = ProductionCompany.create(
  name: 'Twentieth Century Fox Film Corporation',
  contact_info: 'http://www.foxmovies.com/',
  created_by: michael
)
mgm = ProductionCompany.create(
  name: 'Metro-Goldwyn-Mayer',
  contact_info: 'http://www.mgm.com/',
  created_by: michael
)
lucasfilm = ProductionCompany.create(
  name: 'Lucasfilm, Ltd.',
  contact_info: 'http://lucasfilm.com/',
  created_by: michael
)
imagine = ProductionCompany.create(
  name: 'Imagine Entertainment (Firm)',
  contact_info: 'http://www.imagine-entertainment.com/',
  created_by: michael
)
universal = ProductionCompany.create(
  name: 'Universal Pictures Company',
  contact_info: 'https://www.universalpictures.com/',
  created_by: michael
)
amblin = ProductionCompany.create(
  name: 'Amblin Entertainment (Firm)',
  contact_info: 'http://www.amblinpartners.com/',
  created_by: michael
)
toho = ProductionCompany.create(
  name: 'Tōhō Kabushiki Kaisha',
  contact_info: 'http://www.tohoeiga.jp/eng/aisatu.html',
  created_by: michael
)
udrive = ProductionCompany.create(
  name: 'U-Drive Productions',
  created_by: michael
)
daiei = ProductionCompany.create(
  name: 'Daiei Kabushiki Kaisha (1945-1971)',
  created_by: michael
)
horizon = ProductionCompany.create(
  name: 'Horizon Pictures (G.B.)',
  created_by: sienna
)
delphi = ProductionCompany.create(
  name: 'Columbia-Delphi IV Productions',
  created_by: sienna
)
groucho = ProductionCompany.create(
  name: 'Groucho II Film Partnership',
  created_by: sienna
)
silver = ProductionCompany.create(
  name: 'Silver Pictures',
  created_by: sienna
)
guber = ProductionCompany.create(
  name: 'Guber-Peters Company',
  created_by: sienna
)
polygram = ProductionCompany.create(
  name: 'PolyGram Filmed Entertainment (Firm)',
  created_by: sienna
)

# Works
silverado = Work.create(
  title: 'Silverado',
  year: 1985,
  country: us,
  media_type: ff_narrative,
  created_by: michael,
  composers: [broughton],
  directors: [kasdan],
  production_companies: [columbia, delphi],
)
matrix = Work.create(
  title: 'Matrix',
  year: 1999,
  country: us,
  media_type: ff_narrative,
  created_by: michael,
  composers: [davis],
  directors: [wachowski_lana, wachowski_lilly],
  production_companies: [warner_bros, village_roadshow, groucho, silver],
)
batman = Work.create(
  title: 'Batman',
  year: 1989,
  country: us,
  media_type: ff_narrative,
  created_by: michael,
  composers: [elfman],
  directors: [burton],
  production_companies: [warner_bros, guber, polygram],
)
scissorhands = Work.create(
  title: 'Edward Scissorhands',
  year: 1990,
  country: us,
  media_type: ff_narrative,
  created_by: michael,
  composers: [elfman],
  directors: [burton],
  production_companies: [fox],
)
willow = Work.create(
  title: 'Willow',
  year: 1988,
  country: us,
  media_type: ff_narrative,
  created_by: sienna,
  composers: [horner],
  directors: [howard],
  production_companies: [mgm, lucasfilm, imagine],
)
back_to_the_future = Work.create(
  title: 'Back to the future',
  year: 1985,
  country: us,
  media_type: ff_narrative,
  created_by: sienna,
  composers: [silvestri],
  directors: [zemeckis],
  production_companies: [universal, amblin, udrive],
)
rashomon = Work.create(
  title: 'Rashōmon',
  year: 1950,
  country: japan,
  media_type: ff_narrative,
  created_by: sienna,
  composers: [hayasaka],
  directors: [kurosawa],
  production_companies: [daiei],
)
lawrence = Work.create(
  title: 'Lawrence of Arabia',
  year: 1962,
  country: uk,
  media_type: ff_narrative,
  created_by: sienna,
  composers: [jarre],
  directors: [lean],
  production_companies: [horizon],
)
goonies = Work.create(
  title: 'Goonies',
  year: 1985,
  country: us,
  media_type: ff_narrative,
  created_by: sienna,
  composers: [grusin],
  directors: [donner],
  production_companies: [warner_bros, amblin],
)
samurai = Work.create(
  title: 'Shichinin no samurai',
  secondary_title: 'Seven Samurai',
  year: 1954,
  country: japan,
  media_type: ff_narrative,
  created_by: sienna,
  composers: [hayasaka],
  directors: [kurosawa],
  production_companies: [toho],
)

# Resources
Resource.create([
              { work: silverado,
                material_format: printed_score_parts,
                created_by: michael,
                citation_source: 'Copy Owned',
                collections: [harris_collection],
              },
              { work: matrix,
                material_format: printed_score_parts,
                created_by: michael,
                citation_source: 'Copy Owned',
                collections: [harris_collection],
              },
              { work: batman,
                material_format: printed_score_parts,
                created_by: michael,
                citation_source: 'Copy Owned',
                collections: [harris_collection],
              },
              { work: scissorhands,
                material_format: printed_score_parts,
                created_by: michael,
                citation_source: 'Copy Owned',
                collections: [harris_collection],
              },
              { work: willow,
                material_format: printed_score_parts,
                created_by: sienna,
                citation_source: 'Copy Owned',
                collections: [harris_collection],
              },
              { work: back_to_the_future,
                material_format: printed_score_parts,
                created_by: sienna,
                citation_source: 'Copy Owned',
                collections: [harris_collection],
              },
              { work: rashomon,
                material_format: manuscript_score,
                created_by: sienna,
                citation_source: 'Copy Owned',
                collections: [hayasaka_collection],
              },
              { work: lawrence,
                material_format: manuscript_score,
                created_by: sienna,
                citation_source: 'Institutional Website',
                collections: [jarre_collection],
              },
              { work: goonies,
                material_format: manuscript_score,
                created_by: sienna,
                citation_source: 'Institutional Contact',
                collections: [grusin_collection],
              },
              { work: samurai,
                material_format: manuscript_score,
                created_by: sienna,
                citation_source: 'Email with Repository',
                collections: [hayasaka_collection],
              },
            ])
