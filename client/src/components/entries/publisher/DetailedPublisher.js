import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { PUBLISHER_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayPublisher = ({ values }) => (
  <tbody>
    <tr>
      <th>Contact Info</th>
      <td>{values.contact_info}</td>
    </tr>
    <tr>
      <th>Works(s)</th>
      <td>
        {
          values.works.map(c => {
            const text = `${c.film.title}: ${c.material_format.name}`;
            return (
              <div key={c.id}>{wrapWithLink(text, c.id, 'work')}</div>
            )
          })
        }
      </td>
    </tr>
  </tbody>
);

const DetailedPublisher = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayPublisher}
      entryTypeForDisplay="publisher"
      gqlQuery={PUBLISHER_BY_ID}
      id={id}
      queryName="publisher"
    />
  );
};

export default DetailedPublisher;
