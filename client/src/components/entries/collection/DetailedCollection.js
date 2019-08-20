import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { COLLECTION_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayCollection = ({ values }) => (
  <tbody>
  <tr>
    <th>Description</th>
      <td>
        {values.description}
      </td>
    </tr>
    <tr>
      <th>Repository</th>
      <td>
        {
          values.repository
            ? wrapWithLink(values.repository.name, values.repository.id, 'repository')
            : null
        }
      </td>
    </tr>
    <tr>
      <th>Resource(s)</th>
      <td>
        {
          values.resources.map((r) => {
            const text = `${r.work.title}: ${r.material_format.name}`;
            return (
              <div key={r.id}>{wrapWithLink(text, r.id, 'resource')}</div>
            )
          })
        }
      </td>
    </tr>
  </tbody>
);

const DetailedCollection = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayCollection}
      entryTypeForDisplay="collection"
      gqlQuery={COLLECTION_BY_ID}
      id={id}
      queryName="collection"
    />
  );
};

export default DetailedCollection;
