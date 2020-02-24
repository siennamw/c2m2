import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import LinkToEntry from '../LinkToEntry';
import StatusMessage from '../../StatusMessage';

import { LIST_ALL_MATERIAL_FORMATS } from '../../../queries';

const MaterialFormatsTable = () => {
  const {
    data,
    error,
    loading,
  } = useQuery(LIST_ALL_MATERIAL_FORMATS);

  if (loading) {
    return (
      <StatusMessage message="Fetching..." />
    );
  }

  if (error) {
    return (
      <StatusMessage
        message="Sorry! There was an error fetching results."
        type="error"
      />
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
    <StatusMessage
      message="Sorry! No results were found."
      type="error"
    />
  );
};

const MaterialFormatsList = () => (
  <Fragment>
    <h3>Material Formats</h3>
    <MaterialFormatsTable />
  </Fragment>
);

export default MaterialFormatsList;
