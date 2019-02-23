import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { PUBLISHER_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayPublisher = ({ values }) => (
  <div>
    <div className="entry-type">Publisher:</div>
    <h3>
      {values.name}
    </h3>
    <table className="u-full-width">
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
    </table>
  </div>
);

const DetailedPublisher = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayPublisher}
      gqlQuery={PUBLISHER_BY_ID}
      id={id}
      queryName="publisher"
    />
  );
};

export default DetailedPublisher;
