import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { COUNTRY_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayCountry = ({ values }) => (
  <tbody>
    <tr>
      <th>Description</th>
      <td>
        {values.description}
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

const DetailedCountry = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayCountry}
      entryTypeForDisplay="country"
      gqlQuery={COUNTRY_BY_ID}
      id={id}
      queryName="country"
    />
  );
};

export default DetailedCountry;
