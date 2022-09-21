import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <p>
      {'Welcome to Collections of Cinema and Media Music, or '}
      <b>C2M2</b>
      {', a guide to archival collections of film and media music. C2M2 is an ongoing project and we welcome '}
      <Link to="/suggest">
        suggestions for resources to be included in the database
      </Link>
      {'. You may also '}
      <Link to="/contact">
        contact us with general questions or comments
      </Link>
      {' or '}
      <Link to="/about">
        read more about our plans for C2M2
      </Link>
      .
    </p>

    <h2>Contributors</h2>
    <dt>Michael W. Harris, Ph.D.</dt>
    <dd>
      {'Michael is a librarian, archivist, and musicologist. C2M2 is Michael\'s brainchild. For more about Michael, '}
      <a
        href="http://www.michaelwharris.net/"
        target="_blank"
        rel="noopener noreferrer"
      >
        visit his website
      </a>
      {' or '}
      <a
        href="http://www.thetemptrack.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        his blog
      </a>
      .
    </dd>

    <dt>Sienna M. Wood, Ph.D.</dt>
    <dd>
      {'Sienna is a musicologist and software engineer. She built this website. For more about Sienna, '}
      <a
        href="http://www.siennamwood.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        visit her website
      </a>
      .
    </dd>

    <dt>Heather Fisher</dt>
    <dd>
      {'Heather is the Head of Access Services at Saginaw Valley State University. She holds degrees in music performance, musicology (with an emphasis on film, television, and radio music from 1930-1960), and library and information science. Her thesis studied Max Steiner\'s score for '}
      <i>Gone with the Wind</i>
      {', particularly the influence of traditional music on the film\'s narrative.'}
    </dd>

    <dt>Jeff Lyon</dt>
    <dd>
      {'Jeff is a music cataloger at Brigham Young University whose professional assignment focuses on rare music cataloging from the 18th through 20th centuries. Jeff is involved actively in committees of the Music Library Association and the American Library Association. Current research includes a collaborative project with Dr. Brent Yorgason analyzing the film music of the prolific film composer, Max Steiner. '}
      <a
        href="http://maxsteinerinstitute.org/"
        target="_blank"
        rel="noopener noreferrer"
      >
        The Max Steiner Digital Thematic Catalog
      </a>
      {' provides a detailed analysis of all of Steiner\'s film scores.'}
    </dd>

    <dt>Joshua A. Henry, M.M.</dt>
    <dd>
      Joshua is a music cataloger. As a member of the Film Music Interest Group
      of the Music Library Association, Josh has been assisting with data
      structure and input for C2M2.
    </dd>
  </div>
);

export default Home;
