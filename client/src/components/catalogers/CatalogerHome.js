import React from 'react';
import { Link } from 'react-router-dom';

const CatalogerHome = () => (
  <div>
    <h3>Cataloger Home</h3>
    <h4>Resources</h4>
    <ul>
      <li>
        <Link to="/dashboard/material-formats">Material Format Descriptions</Link>
      </li>
      <li>
        <Link to="/dashboard/media-types">Media Type Descriptions</Link>
      </li>
    </ul>
  </div>
);

export default CatalogerHome;
