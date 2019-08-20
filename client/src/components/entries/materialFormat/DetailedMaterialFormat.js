import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { MATERIAL_FORMAT_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayMaterialFormat = ({ values }) => (
  <tbody>
    <tr>
      <th>Description</th>
      <td>{values.description}</td>
    </tr>
    <tr>
      <th>Resource(s)</th>
      <td>
        {
          values.resources.map(r => (
            <div key={r.id}>{wrapWithLink(r.work.title, r.id, 'resource')}</div>
          ))
        }
      </td>
    </tr>
  </tbody>
);

const DetailedMaterialFormat = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayMaterialFormat}
      entryTypeForDisplay="material format"
      gqlQuery={MATERIAL_FORMAT_BY_ID}
      id={id}
      queryName="material_format"
    />
  );
};

export default DetailedMaterialFormat;
