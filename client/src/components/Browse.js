import React from 'react';
import WorksList from './WorksList';
import { isAuthenticated } from '../utils';

const Browse = () => {
  const filter = {};

  if (isAuthenticated()) {
    filter.include_drafts = true;
  }

  return (
    <div>
      <h2>Browse Works</h2>
      <WorksList filter={filter} />
    </div>
  );
};

export default Browse;
