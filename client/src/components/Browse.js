import React from 'react';
import WorksList from './WorksList';

const Browse = () => {
  const filter = {};

  return (
    <div>
      <h2>Browse Works</h2>
      <WorksList filter={filter} />
    </div>
  );
};

export default Browse;
