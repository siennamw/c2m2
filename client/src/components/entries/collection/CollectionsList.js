import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import LinkToEntry from '../LinkToEntry';
import QueryWrap from '../QueryWrap';

import { SEARCH_COLLECTIONS } from '../../../queries';

const CollectionsList = ({ filter }) => (
  <Fragment>
    <h3>Collections</h3>
    <QueryWrap
      filter={filter}
      query={SEARCH_COLLECTIONS}
      queryName="allCollections"
    >
      {
        (allCollections) => (
          <table className="u-full-width">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
              {
                allCollections.map((collection) => (
                  <tr key={collection.id}>
                    <td>
                      <LinkToEntry entry={collection} model="collection" />
                    </td>
                    <td>
                      {collection.description}
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

CollectionsList.defaultProps = {
  filter: {},
};

CollectionsList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default CollectionsList;
