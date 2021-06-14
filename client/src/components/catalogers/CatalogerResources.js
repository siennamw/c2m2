import React from 'react';
import { Link } from 'react-router-dom';

const CatalogerResources = () => (
  <div>
    <h3>Resources</h3>
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

export default CatalogerResources;
