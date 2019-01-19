<img src="/client/src/images/c2m2_logo.svg" width="100%" height="144">

# Collections of Cinema and Media Music
A guide to archival collections of film and media music.  Created by
[Sienna M. Wood, Ph.D.](http://siennamwood.com/), software engineer and musicologist,
and [Michael W. Harris, Ph.D.](http://www.michaelwharris.net/), librarian, archivist, and musicologist.

This project is __currently in development__.  A static informational site is available at
[http://www.c2m2.org/](http://www.c2m2.org/), which will also be the home of the completed project.

## Develop
This project consists of a Ruby on Rails back-end serving a GraphQL endpoint, and a React front-end
with the Apollo client. To run on your local machine:
```
git clone https://github.com/siennamw/c2m2.git
cd c2m2
bin/rake start
```

The Rails server will run on `http://localhost:3000/`
(GraphiQL will be available at `http://localhost:3000/graphiql`).
The React app will run on `http://localhost:3001/`.

## Deployment
This project is set up to be deployed to Heroku.  In production there is only one server.  The React
app is built, then the build is moved to `/public` where it is served up by the Rails server in
addition to the GraphQL endpoint.
