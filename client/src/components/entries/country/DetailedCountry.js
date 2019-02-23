import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { COUNTRY_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayCountry = ({ values }) => (
  <div>
    <div className="entry-type">Country:</div>
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

const DetailedCountry = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayCountry}
      gqlQuery={COUNTRY_BY_ID}
      id={id}
      queryName="country"
    />
  );
};

export default DetailedCountry;
