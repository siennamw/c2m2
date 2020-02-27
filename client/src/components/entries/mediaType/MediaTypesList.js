import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import LinkToEntry from '../LinkToEntry';
import QueryWrap from '../QueryWrap';

import { LIST_ALL_MEDIA_TYPES } from '../../../queries';

const MediaTypesList = ({ filter }) => (
  <Fragment>
    <h3>Media Types</h3>
    <QueryWrap
      filter={filter}
      query={LIST_ALL_MEDIA_TYPES}
      queryName="allMediaTypes"
    >
      {
        allMediaTypes => (
          <table className="u-full-width">
            <tbody>
              {
                allMediaTypes.map(mediaType => (
                  <tr key={mediaType.id}>
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
        )
      }
    </QueryWrap>
  </Fragment>
);

MediaTypesList.defaultProps = {
  filter: {},
};

MediaTypesList.propTypes = {
  filter: PropTypes.object,
};

export default MediaTypesList;
