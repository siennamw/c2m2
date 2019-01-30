# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).

# Catalogers - with dummy passwords for development only!!
michael = Cataloger.create(
  name: 'Michael W. Harris',
  email: 'michael.harris@example.com',
  password: 'password',
)
sienna = Cataloger.create(
  name: 'Sienna M. Wood',
  email: 'sienna.wood@example.com',
  password: 'password',
  created_by: michael,
)

# Countries
us = Country.create(name: 'United States', cataloger: michael)
japan = Country.create(name: 'Japan', cataloger: michael)
uk = Country.create(name: 'United Kingdom', cataloger: sienna)

# Media Types
ff_narrative = MediaType.create(name: 'Feature Film - Narrative', cataloger: michael)
MediaType.create([
                 { name: 'Feature Film - Documentary/Other', cataloger: michael },
                 { name: 'Short Film - Narrative', cataloger: michael },
                 { name: 'Short Film - Documentary/Other', cataloger: michael },
                 { name: 'Silent Film - Feature, Short, or Photoplay', cataloger: michael },
                 { name: 'Serial Series - Narrative', cataloger: sienna },
                 { name: 'Serial Series - Documentary/Other', cataloger: sienna },
                 { name: 'Serial Series - Information/Education', cataloger: sienna },
                 { name: 'Video Game', cataloger: sienna },
                 { name: 'Radio or Podcast', cataloger: sienna },
                 ])

# Material Formats
manuscript_score = MaterialFormat.create(name: 'Manuscript Scores', cataloger: michael)
printed_score_parts = MaterialFormat.create(name: 'Printed Scores and Parts', cataloger: michael)
MaterialFormat.create([
                        { name: 'Short Scores', cataloger: michael },
                        { name: 'Sketches', cataloger: michael },
                        { name: 'Published Scores or Collections', cataloger: michael },
                        { name: 'Cue Sheets', cataloger: michael },
                        { name: 'Working Notes', cataloger: sienna },
                        { name: 'Recordings', cataloger: sienna },
                        { name: 'Contracts', cataloger: sienna },
                        { name: 'Personal Papers and Other Items', cataloger: sienna },
                      ])

# Repositories
harris = Repository.create(
  name: 'Michael W. Harris Family Archive and Arcade Fun Complex',
  location: 'Boulder, CO',
  website: 'http://www.michaelwharris.net/',
  cataloger: michael,
)
amrc = Repository.create(
  name: 'American Music Research Center at CU Boulder',
  location: 'Boulder, CO',
  website: 'http://www.colorado.edu/amrc/',
  cataloger: sienna,
)
ahc = Repository.create(
  name: 'American Heritage Center at University of Wyoming',
  location: 'Laramie, WY',
  website: 'http://www.uwyo.edu/ahc/',
  cataloger: michael,
)
amjm = Repository.create(
  name: 'Archives of Modern Japanese Music at Meiji Gakuin University',
  location: 'Tokyo, Japan',
  website: 'http://www.meijigakuin.ac.jp/library/amjm/en/',
  cataloger: sienna,
)

# Collections
harris_collection = Collection.create(
  name: 'Michael W. Harris Collection',
  repository: harris,
  cataloger: michael,
)
grusin_collection = Collection.create(
  name: 'Dave Grusin manuscripts',
  repository: amrc,
  cataloger: sienna,
)
jarre_collection = Collection.create(
  name: 'Maurice Jarre papers',
  repository: ahc,
  cataloger: sienna,
)
hayasaka_collection = Collection.create(
  name: 'Fumio Hayasaka Collection',
  repository: amjm,
  cataloger: michael,
)

# Composers
broughton = Composer.create(
  name: 'Broughton, Bruce, 1945-',
  imdb_link: 'http://www.imdb.com/name/nm0005976/',
  cataloger: sienna
)
davis = Composer.create(
  name: 'Davis, Don, 1957-',
  imdb_link: 'http://www.imdb.com/name/nm0204485/',
  cataloger: sienna
)
elfman = Composer.create(
  name: 'Elfman, Danny',
  imdb_link: 'http://www.imdb.com/name/nm0000384/',
  cataloger: sienna
)
horner = Composer.create(
  name: 'Horner, James',
  imdb_link: 'http://www.imdb.com/name/nm0000035/',
  cataloger: sienna
)
silvestri = Composer.create(
  name: 'Silvestri, Alan',
  imdb_link: 'http://www.imdb.com/name/nm0006293/',
  cataloger: michael
)
hayasaka = Composer.create(
  name: 'Hayasaka, Fumio, 1914-1955',
  imdb_link: 'http://www.imdb.com/name/nm0370593/',
  cataloger: michael
)
grusin = Composer.create(
  name: 'Grusin, Dave',
  imdb_link: 'http://www.imdb.com/name/nm0006115/',
  cataloger: michael
)
jarre = Composer.create(
  name: 'Jarre, Maurice',
  imdb_link: 'http://www.imdb.com/name/nm0003574/',
  cataloger: michael
)

# Directors
kasdan = Director.create(
  name: 'Kasdan, Lawrence, 1949-',
  imdb_link: 'http://www.imdb.com/name/nm0001410/',
  cataloger: michael
)
wachowski_lilly = Director.create(
  name: 'Wachowski, Lilly, 1967-',
  imdb_link: 'http://www.imdb.com/name/nm0905152/',
  cataloger: michael
)
wachowski_lana = Director.create(
  name: 'Wachowski, Lana, 1965-',
  imdb_link: 'http://www.imdb.com/name/nm0905154/',
  cataloger: michael
)
burton = Director.create(
  name: 'Burton, Tim, 1958-',
  imdb_link: 'http://www.imdb.com/name/nm0000318/',
  cataloger: michael
)
howard = Director.create(
  name: 'Howard, Ron, 1954-',
  imdb_link: 'http://www.imdb.com/name/nm0000165/',
  cataloger: michael
)
zemeckis = Director.create(
  name: 'Zemeckis, Robert, 1952-',
  imdb_link: 'http://www.imdb.com/name/nm0000709/',
  cataloger: sienna
)
kurosawa = Director.create(
  name: 'Kurosawa, Akira, 1910-1998',
  imdb_link: 'http://www.imdb.com/name/nm0000041/',
  cataloger: sienna
)
donner = Director.create(
  name: 'Donner, Richard',
  imdb_link: 'http://www.imdb.com/name/nm0001149/',
  cataloger: sienna
)
lean = Director.create(
  name: 'Lean, David, 1908-1991',
  imdb_link: 'http://www.imdb.com/name/nm0000180/',
  cataloger: sienna
)

# Production Companies
columbia = ProductionCompany.create(
  name: 'Columbia Pictures Corporation',
  contact_info: 'http://www.sonypictures.com/',
  cataloger: michael
)
warner_bros = ProductionCompany.create(
  name: 'Warner Bros. Pictures (1969- )',
  contact_info: 'http://www.warnerbros.com/',
  cataloger: michael
)
village_roadshow = ProductionCompany.create(
  name: 'Village Roadshow Pictures',
  contact_info: 'http://vreg.com/',
  cataloger: michael
)
fox = ProductionCompany.create(
  name: 'Twentieth Century Fox Film Corporation',
  contact_info: 'http://www.foxmovies.com/',
  cataloger: michael
)
mgm = ProductionCompany.create(
  name: 'Metro-Goldwyn-Mayer',
  contact_info: 'http://www.mgm.com/',
  cataloger: michael
)
lucasfilm = ProductionCompany.create(
  name: 'Lucasfilm, Ltd.',
  contact_info: 'http://lucasfilm.com/',
  cataloger: michael
)
imagine = ProductionCompany.create(
  name: 'Imagine Entertainment (Firm)',
  contact_info: 'http://www.imagine-entertainment.com/',
  cataloger: michael
)
universal = ProductionCompany.create(
  name: 'Universal Pictures Company',
  contact_info: 'https://www.universalpictures.com/',
  cataloger: michael
)
amblin = ProductionCompany.create(
  name: 'Amblin Entertainment (Firm)',
  contact_info: 'http://www.amblinpartners.com/',
  cataloger: michael
)
toho = ProductionCompany.create(
  name: 'Tōhō Kabushiki Kaisha',
  contact_info: 'http://www.tohoeiga.jp/eng/aisatu.html',
  cataloger: michael
)
udrive = ProductionCompany.create(
  name: 'U-Drive Productions',
  cataloger: michael
)
daiei = ProductionCompany.create(
  name: 'Daiei Kabushiki Kaisha (1945-1971)',
  cataloger: michael
)
horizon = ProductionCompany.create(
  name: 'Horizon Pictures (G.B.)',
  cataloger: sienna
)
delphi = ProductionCompany.create(
  name: 'Columbia-Delphi IV Productions',
  cataloger: sienna
)
groucho = ProductionCompany.create(
  name: 'Groucho II Film Partnership',
  cataloger: sienna
)
silver = ProductionCompany.create(
  name: 'Silver Pictures',
  cataloger: sienna
)
guber = ProductionCompany.create(
  name: 'Guber-Peters Company',
  cataloger: sienna
)
polygram = ProductionCompany.create(
  name: 'PolyGram Filmed Entertainment (Firm)',
  cataloger: sienna
)

# Publishers
omni = Publisher.create(
  name: 'Omni Music Publishing',
  contact_info: 'http://www.omnimusicpublishing.com/',
  cataloger: michael
)

# Works
Work.create([
              { title: 'Silverado (Motion picture)',
                year: 1985,
                country: us,
                media_type: ff_narrative,
                material_format: printed_score_parts,
                cataloger: michael,
                citation_source: 'Copy Owned',
                collections: [harris_collection],
                composers: [broughton],
                directors: [kasdan],
                production_companies: [columbia, delphi],
                publishers: [omni],
              },
              { title: 'Matrix (Motion picture)',
                year: 1999,
                country: us,
                media_type: ff_narrative,
                material_format: printed_score_parts,
                cataloger: michael,
                citation_source: 'Copy Owned',
                collections: [harris_collection],
                composers: [davis],
                directors: [wachowski_lana, wachowski_lilly],
                production_companies: [warner_bros, village_roadshow, groucho, silver],
                publishers: [omni],
              },
              { title: 'Batman (Motion picture: 1989)',
                year: 1989,
                country: us,
                media_type: ff_narrative,
                material_format: printed_score_parts,
                cataloger: michael,
                citation_source: 'Copy Owned',
                collections: [harris_collection],
                composers: [elfman],
                directors: [burton],
                production_companies: [warner_bros, guber, polygram],
                publishers: [omni],
              },
              { title: 'Edward Scissorhands (Motion picture)',
                year: 1990,
                country: us,
                media_type: ff_narrative,
                material_format: printed_score_parts,
                cataloger: michael,
                citation_source: 'Copy Owned',
                collections: [harris_collection],
                composers: [elfman],
                directors: [burton],
                production_companies: [fox],
                publishers: [omni],
              },
              { title: 'Willow (Motion picture)',
                year: 1988,
                country: us,
                media_type: ff_narrative,
                material_format: printed_score_parts,
                cataloger: sienna,
                citation_source: 'Copy Owned',
                collections: [harris_collection],
                composers: [horner],
                directors: [howard],
                production_companies: [mgm, lucasfilm, imagine],
                publishers: [omni],
              },
              { title: 'Back to the future (Motion picture)',
                year: 1985,
                country: us,
                media_type: ff_narrative,
                material_format: printed_score_parts,
                cataloger: sienna,
                citation_source: 'Copy Owned',
                collections: [harris_collection],
                composers: [silvestri],
                directors: [zemeckis],
                production_companies: [universal, amblin, udrive],
                publishers: [omni],
              },
              { title: 'Rashōmon (Motion picture)',
                year: 1950,
                country: japan,
                media_type: ff_narrative,
                material_format: manuscript_score,
                cataloger: sienna,
                citation_source: 'Copy Owned',
                collections: [hayasaka_collection],
                composers: [hayasaka],
                directors: [kurosawa],
                production_companies: [daiei],
              },
              { title: 'Lawrence of Arabia (Motion picture)',
                year: 1962,
                country: uk,
                media_type: ff_narrative,
                finding_aid_link: 'http://www.uwyo.edu/ahc/_files/pdffa/03261.pdf',
                material_format: manuscript_score,
                cataloger: sienna,
                citation_source: 'Institutional Website',
                collections: [jarre_collection],
                composers: [jarre],
                directors: [lean],
                production_companies: [horizon],
              },
              { title: 'Goonies',
                year: 1985,
                country: us,
                media_type: ff_narrative,
                finding_aid_link: 'http://www.colorado.edu/amrc/sites/default/files/attached-files/AMRC-Grusin.pdf',
                material_format: manuscript_score,
                cataloger: sienna,
                citation_source: 'Institutional Contact',
                collections: [grusin_collection],
                composers: [grusin],
                directors: [donner],
                production_companies: [warner_bros, amblin],
              },
              { title: 'Shichinin no samurai (Motion picture)',
                secondary_title: 'Seven Samurai',
                year: 1954,
                country: japan,
                media_type: ff_narrative,
                material_format: manuscript_score,
                cataloger: sienna,
                citation_source: 'Email with Repository',
                collections: [hayasaka_collection],
                composers: [hayasaka],
                directors: [kurosawa],
                production_companies: [toho],
              },
            ])
