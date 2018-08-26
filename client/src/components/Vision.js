import React from 'react';
import { Link } from 'react-router-dom';

import screenshot from '../images/ss-adv-search.png';

const Vision = () => (
  <div>
    <h2>Vision and Design</h2>
    <div className="row">
      <div className="eight columns">
        <p>Collections of Cinema and Media Music (C2M2) seeks to provide
          scholars
          working with music in film, television, video game, and other types of
          media
          with an easy way to locate archival materials relevant to their
          research. This
          website will host a database searchable by composer, title of a work,
          production company, publication date, location of materials, etc. This
          information will be gathered by working with both scholars and
          archivists
          active in the field. For now, new materials will be added to the
          database by
          the creators of this site, Michael Harris and Sienna Wood, but in the
          near
          future we hope to bring on additional contributors to help with tasks
          such as
          this.</p>
        <p>As this project matures, C2M2 hopes to foster communication between
          scholars,
          archivists, and practitioners in order to build a robust archival
          record of
          cinema and media music. For more on this, see <Link to="/about">Why
            C2M2?</Link>.
        </p>
      </div>
      <div className="four columns">
        <p className="caption">In the future, a form like this will allow users
          to search for archival resources concerning
          media music.</p>
        <img className="fltrt" alt="" src={screenshot} />
      </div>
    </div>
  </div>
);

export default Vision;
