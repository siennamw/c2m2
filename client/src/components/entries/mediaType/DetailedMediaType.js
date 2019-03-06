import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { MEDIA_TYPE_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayMediaType = ({ values }) => (
  <tbody>
    <tr>
      <th>Description</th>
      <td>{values.description}</td>
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
);

const DetailedMediaType = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayMediaType}
      entryTypeForDisplay="media type"
      gqlQuery={MEDIA_TYPE_BY_ID}
      id={id}
      queryName="media_type"
    />
  );
};

export default DetailedMediaType;
