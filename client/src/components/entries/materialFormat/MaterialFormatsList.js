import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import LinkToEntry from '../LinkToEntry';

import { LIST_ALL_MATERIAL_FORMATS } from '../../../queries';

const MaterialFormatsTable = () => {
  const {
    data,
    error,
    loading,
  } = useQuery(LIST_ALL_MATERIAL_FORMATS);

  if (loading) {
    return (
      <div className="status-message">
        Fetching...
      </div>
    );
  }

  if (error) {
    return (
      <div className="status-message error">
        Sorry! There was an error fetching results.
      </div>
    );
  }

  const haveData = data && data.allMaterialFormats && data.allMaterialFormats.length > 0;

  if (haveData) {
    return (
      <table className="u-full-width">
        <tbody>
          {
            data.allMaterialFormats.map(materialFormat => (
              <tr>
                <th>
                  <LinkToEntry entry={materialFormat} model="material_format" />
                </th>
                <td>
                  {materialFormat.description}
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }

  return (
    <div className="status-message error">
      Sorry! No results were found.
    </div>
  );
};

const MaterialFormatsList = () => (
  <Fragment>
    <h3>Material Formats</h3>
    <MaterialFormatsTable />
  </Fragment>
);

export default MaterialFormatsList;
