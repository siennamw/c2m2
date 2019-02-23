import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { COLLECTION_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayCollection = ({ values }) => (
  <div>
    <div className="entry-type">Collection:</div>
    <h3>
      {values.name}
    </h3>
    <table className="u-full-width">
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

const DetailedCollection = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayCollection}
      gqlQuery={COLLECTION_BY_ID}
      id={id}
      queryName="collection"
    />
  );
};

export default DetailedCollection;
