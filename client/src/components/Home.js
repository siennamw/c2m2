import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <p>Welcome to Collections of Cinema and Media Music, or <b>C2M2</b>, a guide to
      archival collections of film and media music. C2M2 is currently in development
      and we welcome <Link to="/suggest">
        suggestions for resources to be included in the database</Link>.
      You may also <Link to="/contact">contact us with general questions or
        comments</Link> or <Link to="/vision">read more about our plans for C2M2</Link>.</p>

    <h3>Contributors</h3>
    <div className="row">
      <div className="six columns">
        <h3>Michael W. Harris, Ph.D.</h3>
        <p>Michael is a librarian, archivist, and musicologist. C2M2 is Michael's
          brainchild. For more about
          Michael, <a href="http://www.michaelwharris.net/" target="_blank"
                      rel="noopener noreferrer">
            visit his website</a> or <a href="http://www.thetemptrack.com" target="_blank"
                                        rel="noopener noreferrer">
            his blog</a>.
        </p>
      </div>
      <div className="six columns">
        <h3>Sienna M. Wood, Ph.D.</h3>
        <p>Sienna is a musicologist and software engineer. She built this website. For
          more about Sienna, <a href="http://www.siennamwood.com" target="_blank"
                                rel="noopener noreferrer">
            visit her website</a>.
        </p>
      </div>
    </div>
  </div>
);

export default Home;
