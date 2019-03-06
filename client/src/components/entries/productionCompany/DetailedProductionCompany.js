import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { PRODUCTION_COMPANY_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayProductionCompany = ({ values }) => (
  <tbody>
    <tr>
      <th>Contact Info</th>
      <td>{values.contact_info}</td>
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

const DetailedProductionCompany = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayProductionCompany}
      entryTypeForDisplay="production company"
      gqlQuery={PRODUCTION_COMPANY_BY_ID}
      id={id}
      queryName="production_company"
    />
  );
};

export default DetailedProductionCompany;
