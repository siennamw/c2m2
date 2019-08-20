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
      <th>Composer for Work(s)</th>
      <td>
        {
          values.works.map(w => (
            <div key={w.id}>{wrapWithLink(w.title, w.id, 'work')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Orchestrator for Work(s)</th>
      <td>
        {
          values.works_as_orchestrator.map(w => (
            <div key={w.id}>{wrapWithLink(w.title, w.id, 'work')}</div>
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
