import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { REPOSITORY_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayRepository = ({ values }) => (
  <tbody>
    <tr>
      <th>Location</th>
      <td>{values.location}</td>
    </tr>
    <tr>
      <th>Website</th>
      <td>
        <a
          href={values.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {values.website}
        </a>
      </td>
    </tr>
    <tr>
      <th>Collection(s)</th>
      <td>
        {
          values.collections.map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'collection')}</div>
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
);

const DetailedRepository = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayRepository}
      entryTypeForDisplay="repository"
      gqlQuery={REPOSITORY_BY_ID}
      id={id}
      queryName="repository"
    />
  );
};

export default DetailedRepository;
