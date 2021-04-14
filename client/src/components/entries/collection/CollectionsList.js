import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import EnhancedTable from '../EnhancedTable';
import QueryWrap from '../QueryWrap';

import { SEARCH_COLLECTIONS } from '../../../queries';

const CollectionsList = ({ filter }) => {
  const [sortAscending, setSortAscending] = useState(true);
  const [sortBy, setSortBy] = useState('name');

  return (
    <Fragment>
      <h3>Collections</h3>
      <QueryWrap
        filter={filter}
        sortAscending={sortAscending}
        sortBy={sortBy}
        query={SEARCH_COLLECTIONS}
        queryName="allCollections"
      >
        {
          (allCollections) => (
            <EnhancedTable
              columnData={[
                {
                  label: 'Name',
                  field: 'name',
                },
                {
                  label: 'Description',
                  field: 'description',
                },
              ]}
              linkToEntryDisplayField="name"
              model="collection"
              rowData={allCollections}
              setSortAscending={setSortAscending}
              setSortBy={setSortBy}
              sortAscending={sortAscending}
              sortBy={sortBy}
            />
          )
        }
      </QueryWrap>
    </Fragment>
  );
};

CollectionsList.defaultProps = {
  filter: {},
};

CollectionsList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default CollectionsList;
