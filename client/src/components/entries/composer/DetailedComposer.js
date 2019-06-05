import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { COMPOSER_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayComposer = ({ values }) => (
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
      <th>Composer for Film(s)</th>
      <td>
        {
          values.films.map(c => (
            <div key={c.id}>{wrapWithLink(c.title, c.id, 'film')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Orchestrator for Film(s)</th>
      <td>
        {
          values.films_as_orchestrator.map(c => (
            <div key={c.id}>{wrapWithLink(c.title, c.id, 'film')}</div>
          ))
        }
      </td>
    </tr>
  </tbody>
);

const DetailedComposer = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayComposer}
      entryTypeForDisplay="composer"
      gqlQuery={COMPOSER_BY_ID}
      id={id}
      queryName="composer"
    />
  );
};

export default DetailedComposer;
