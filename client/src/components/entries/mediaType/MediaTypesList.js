import React, { Fragment } from 'react';
import { useQuery } from '@apollo/react-hooks';

import { LIST_ALL_MEDIA_TYPES } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const MediaTypesTable = () => {
  const {
    data,
    error,
    loading,
  } = useQuery(LIST_ALL_MEDIA_TYPES);

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

  const haveData = data && data.allMediaTypes && data.allMediaTypes.length > 0;

  if (haveData) {
    return (
      <table className="u-full-width">
        <tbody>
          {
            data.allMediaTypes.map(mediaType => (
              <tr>
                <th>
                  { wrapWithLink(mediaType.name, mediaType.id, 'media_type') }
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
    <div className="status-message error">
      Sorry! No results were found.
    </div>
  );
};

const MediaTypesList = () => (
  <Fragment>
    <h3>Media Types</h3>
    <MediaTypesTable />
  </Fragment>
);

export default MediaTypesList;
