# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

# Countries
us = Country.create(name: 'United States')
japan = Country.create(name: 'Japan')
uk = Country.create(name: 'United Kingdom')

# Media Types
ff_narrative = MediaType.create(name: 'Feature Film - Narrative')
MediaType.create([
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

# Material Formats
manuscript_score = MaterialFormat.create(name: 'Manuscript Scores')
printed_score_parts = MaterialFormat.create(name: 'Printed Scores and Parts')
MaterialFormat.create([
                      { name: 'Short Scores' },
                      { name: 'Sketches' },
                      { name: 'Published Scores or Collections' },
                      { name: 'Cue Sheets' },
                      { name: 'Working Notes' },
                      { name: 'Recordings' },
                      { name: 'Contracts' },
                      { name: 'Personal Papers and Other Items' },
                      ])

# Catalogers
michael = Cataloger.create(name: 'Michael W. Harris', email: 'michaelwharris1980@gmail.com ')
sienna = Cataloger.create(name: 'Sienna M. Wood', email: 'sienna.m.wood@gmail.com')

# Repositories
harris = Repository.create(name: 'Michael W. Harris Family Archive and Arcade Fun Complex', location: 'Boulder, CO', website: 'http://www.michaelwharris.net/')
amrc = Repository.create(name: 'American Music Research Center at CU Boulder', location: 'Boulder, CO', website: 'http://www.colorado.edu/amrc/')
ahc = Repository.create(name: 'American Heritage Center at University of Wyoming', location: 'Laramie, WY', website: 'http://www.uwyo.edu/ahc/')
amjm = Repository.create(name: 'Archives of Modern Japanese Music at Meiji Gakuin University', location: 'Tokyo, Japan', website: 'http://www.meijigakuin.ac.jp/library/amjm/en/')

# Collections
harris_collection = Collection.create(name: 'Michael W. Harris Collection', repository: harris)
grusin_collection = Collection.create(name: 'Dave Grusin manuscripts', repository: amrc)
jarre_collection = Collection.create(name: 'Maurice Jarre papers', repository: ahc)
hayasaka_collection = Collection.create(name: 'Fumio Hayasaka Collection', repository: amjm)

# Composers
broughton = Composer.create(name: 'Broughton, Bruce, 1945-', imdb_link: 'http://www.imdb.com/name/nm0005976/')
davis = Composer.create(name: 'Davis, Don, 1957-', imdb_link: 'http://www.imdb.com/name/nm0204485/')
elfman = Composer.create(name: 'Elfman, Danny', imdb_link: 'http://www.imdb.com/name/nm0000384/')
horner = Composer.create(name: 'Horner, James', imdb_link: 'http://www.imdb.com/name/nm0000035/')
silvestri = Composer.create(name: 'Silvestri, Alan', imdb_link: 'http://www.imdb.com/name/nm0006293/')
hayasaka = Composer.create(name: 'Hayasaka, Fumio, 1914-1955', imdb_link: 'http://www.imdb.com/name/nm0370593/')
grusin = Composer.create(name: 'Grusin, Dave', imdb_link: 'http://www.imdb.com/name/nm0006115/')
jarre = Composer.create(name: 'Jarre, Maurice', imdb_link: 'http://www.imdb.com/name/nm0003574/')

# Directors
kasdan = Director.create(name: 'Kasdan, Lawrence, 1949-', imdb_link: 'http://www.imdb.com/name/nm0001410/')
wachowski_lilly = Director.create(name: 'Wachowski, Lilly, 1967-', imdb_link: 'http://www.imdb.com/name/nm0905152/')
wachowski_lana = Director.create(name: 'Wachowski, Lana, 1965-', imdb_link: 'http://www.imdb.com/name/nm0905154/')
burton = Director.create(name: 'Burton, Tim, 1958-', imdb_link: 'http://www.imdb.com/name/nm0000318/')
howard = Director.create(name: 'Howard, Ron, 1954-', imdb_link: 'http://www.imdb.com/name/nm0000165/')
zemeckis = Director.create(name: 'Zemeckis, Robert, 1952-', imdb_link: 'http://www.imdb.com/name/nm0000709/')
kurosawa = Director.create(name: 'Kurosawa, Akira, 1910-1998', imdb_link: 'http://www.imdb.com/name/nm0000041/')
donner = Director.create(name: 'Donner, Richard', imdb_link: 'http://www.imdb.com/name/nm0001149/')
lean = Director.create(name: 'Lean, David, 1908-1991', imdb_link: 'http://www.imdb.com/name/nm0000180/')

# Production Companies
columbia = ProductionCompany.create(name: 'Columbia Pictures Corporation', contact_info: 'http://www.sonypictures.com/')
warner_bros = ProductionCompany.create(name: 'Warner Bros. Pictures (1969- )', contact_info: 'http://www.warnerbros.com/')
village_roadshow = ProductionCompany.create(name: 'Village Roadshow Pictures', contact_info: 'http://vreg.com/')
fox = ProductionCompany.create(name: 'Twentieth Century Fox Film Corporation', contact_info: 'http://www.foxmovies.com/')
mgm = ProductionCompany.create(name: 'Metro-Goldwyn-Mayer', contact_info: 'http://www.mgm.com/')
lucasfilm = ProductionCompany.create(name: 'Lucasfilm, Ltd.', contact_info: 'http://lucasfilm.com/')
imagine = ProductionCompany.create(name: 'Imagine Entertainment (Firm)', contact_info: 'http://www.imagine-entertainment.com/')
universal = ProductionCompany.create(name: 'Universal Pictures Company', contact_info: 'https://www.universalpictures.com/')
amblin = ProductionCompany.create(name: 'Amblin Entertainment (Firm)', contact_info: 'http://www.amblinpartners.com/')
toho = ProductionCompany.create(name: 'Tōhō Kabushiki Kaisha', contact_info: 'http://www.tohoeiga.jp/eng/aisatu.html')
udrive = ProductionCompany.create(name: 'U-Drive Productions')
daiei = ProductionCompany.create(name: 'Daiei Kabushiki Kaisha (1945-1971)')
horizon = ProductionCompany.create(name: 'Horizon Pictures (G.B.)')
delphi = ProductionCompany.create(name: 'Columbia-Delphi IV Productions')
groucho = ProductionCompany.create(name: 'Groucho II Film Partnership')
silver = ProductionCompany.create(name: 'Silver Pictures')
guber = ProductionCompany.create(name: 'Guber-Peters Company')
polygram = ProductionCompany.create(name: 'PolyGram Filmed Entertainment (Firm)')

# Publishers
omni = Publisher.create(name: 'Omni Music Publishing', contact_info: 'http://www.omnimusicpublishing.com/')

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
              cataloger: michael,
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
              cataloger: michael,
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
              cataloger: michael,
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
              cataloger: michael,
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
              cataloger: michael,
              citation_source: 'Email with Repository',
              collections: [hayasaka_collection],
              composers: [hayasaka],
              directors: [kurosawa],
              production_companies: [toho],
            },
            ])
