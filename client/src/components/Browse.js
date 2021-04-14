import React from 'react';
import WorksList from './entries/work/WorksList';

const Browse = () => {
  const filter = {};

  return (
    <div>
      <h2>Browse Works</h2>
      <WorksList
        initialSortAscending={false}
        initialSortField="created_at"
        filter={filter}
      />
    </div>
  );
};

export default Browse;
