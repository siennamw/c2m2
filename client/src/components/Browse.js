import React from 'react';
import FilmsList from './FilmsList';

const Browse = () => {
  const filter = {};

  return (
    <div>
      <h2>Browse Films</h2>
      <FilmsList filter={filter} />
    </div>
  );
};

export default Browse;
