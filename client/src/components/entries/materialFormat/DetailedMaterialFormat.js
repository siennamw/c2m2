import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { MATERIAL_FORMAT_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayMaterialFormat = ({ values }) => (
  <div>
    <div className="entry-type">Material Format:</div>
    <h3>
      {values.name}
    </h3>
    <table className="u-full-width">
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
    </table>
  </div>
);

const DetailedMaterialFormat = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayMaterialFormat}
      gqlQuery={MATERIAL_FORMAT_BY_ID}
      id={id}
      queryName="material_format"
    />
  );
};

export default DetailedMaterialFormat;
