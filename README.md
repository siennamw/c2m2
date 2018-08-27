<img src="/client/src/images/c2m2_logo.svg" width="100%" height="144">

# Collections of Cinema and Media Music
A guide to archival collections of film and media music.  Created by
[Sienna M. Wood, Ph.D.](http://siennamwood.com/), software engineer and musicologist,
and [Michael W. Harris, Ph.D.](http://www.michaelwharris.net/), librarian, archivist, and musicologist.

This project is __currently in development__.  A static informational site is available at
[http://www.c2m2.org/](http://www.c2m2.org/), which will also be the home of the completed project.

# Development
This project consists of a Ruby on Rails back-end serving a GraphQL endpoint, and a React front-end
with the Apollo client. To develop on your local machine:

- Clone this repository and navigate into it:
    ```
    git clone https://github.com/siennamw/c2m2.git
    cd c2m2
    ```
- Install Ruby gems and launch server on `http://localhost:3000/` (GraphiQL will be available at `http://localhost:3000/graphiql`):
    ```
    cd server
    bundle install
    rails server
    ```
- Install Node packages and launch client on `http://localhost:3001/`:
    ```
    cd ../client
    npm i
    npm start
    ```
