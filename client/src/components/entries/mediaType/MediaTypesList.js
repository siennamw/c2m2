import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import LinkToEntry from '../LinkToEntry';
import StatusMessage from '../../StatusMessage';

import { LIST_ALL_MEDIA_TYPES } from '../../../queries';

const MediaTypesTable = () => {
  const {
    data,
    error,
    loading,
  } = useQuery(LIST_ALL_MEDIA_TYPES);

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

  const haveData = data && data.allMediaTypes && data.allMediaTypes.length > 0;

  if (haveData) {
    return (
      <table className="u-full-width">
        <tbody>
          {
            data.allMediaTypes.map(mediaType => (
              <tr>
                <th>
                  <LinkToEntry entry={mediaType} model="media_type" />
                </th>
                <td>
                  {mediaType.description}
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

const MediaTypesList = () => (
  <Fragment>
    <h3>Media Types</h3>
    <MediaTypesTable />
  </Fragment>
);

export default MediaTypesList;
