<img src="/client/src/images/c2m2_logo.svg" width="100%" height="144">

# C2M2: Collections of Cinema and Media Music
A guide to archival collections of film and media music created by
[Sienna M. Wood, Ph.D.](http://siennamwood.com/), software engineer and musicologist,
and [Michael W. Harris, Ph.D.](http://www.michaelwharris.net/), librarian, archivist, and musicologist.
See the ongoing project at [http://www.c2m2.org](http://www.c2m2.org).

## Development
This project consists of a Ruby on Rails back-end serving a GraphQL endpoint, and a React front-end with the Apollo client.
The database is Postgres.
To run on your local machine, ensure that you have the correct versions of Ruby and Node installed (see `/client/package.json` and `Gemfile` to determine these versions), and install and start Postgres.
If running `which yarn` returns nothing, run `npm install -g yarn` to install yarn globally.
Then, run the following commands:
```
// copy code to your computer
git clone https://github.com/siennamw/c2m2.git

// install Ruby dependencies
cd c2m2
bundle

// install JavaSript dependencies
cd client
yarn

// set up database
cd ..
bin/rake db:reset

// run
bin/rake start
```

The Rails server will run on `http://localhost:3000/`
(GraphiQL will be available at `http://localhost:3000/graphiql`).
The React app will run on `http://localhost:3001/`.

### Run Tests
From the root of the app, run
```
bin/rake test
```

## Deployment
This project is set up to be deployed to Heroku.  In production there is only one server.  The React
app is built, then the build is moved to `/public` where it is served up by the Rails server in
addition to the GraphQL endpoint.
