import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { DIRECTOR_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayDirector = ({ values }) => (
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
      <th>Work(s)</th>
      <td>
        {
          values.works.map(w => (
            <div key={w.id}>{wrapWithLink(w.title, w.id, 'work')}</div>
          ))
        }
      </td>
    </tr>
  </tbody>
);

const DetailedDirector = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayDirector}
      entryTypeForDisplay="director"
      gqlQuery={DIRECTOR_BY_ID}
      id={id}
      queryName="director"
    />
  );
};

export default DetailedDirector;
