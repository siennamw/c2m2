import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { DIRECTOR_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayDirector = ({ values }) => (
  <div>
    <div className="entry-type">Director:</div>
    <h3>
      {values.name}
    </h3>
    <table className="u-full-width">
      <tbody>
        <tr>
          <th>IMDB Link</th>
          <td>
            <a
              href={values.imdb_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {values.imdb_link}
            </a>
          </td>
        </tr>
        <tr>
          <th>Works(s)</th>
          <td>
            {
              values.works.map(c => (
                <div key={c.id}>{wrapWithLink(c.title, c.id, 'work')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Cataloger</th>
          <td>
            {
              values.cataloger
                ? wrapWithLink(values.cataloger.name, values.cataloger.id, 'cataloger')
                : null
            }
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const DetailedDirector = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayDirector}
      gqlQuery={DIRECTOR_BY_ID}
      id={id}
      queryName="director"
    />
  );
};

export default DetailedDirector;
