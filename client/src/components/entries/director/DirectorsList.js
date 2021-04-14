import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import EnhancedTable from '../EnhancedTable';
import QueryWrap from '../QueryWrap';

import { SEARCH_DIRECTORS } from '../../../queries';

const DirectorsList = ({ filter }) => {
  const [sortAscending, setSortAscending] = useState(true);
  const [sortBy, setSortBy] = useState('name');

  return (
    <Fragment>
      <h3>Directors</h3>
      <QueryWrap
        filter={filter}
        sortAscending={sortAscending}
        sortBy={sortBy}
        query={SEARCH_DIRECTORS}
        queryName="allDirectors"
      >
        {
          (allDirectors) => (
            <EnhancedTable
              columnData={[
                {
                  label: 'Name',
                  field: 'name',
                },
                {
                  label: 'IMDB Link',
                  field: 'imdb_link',
                },
              ]}
              linkToEntryDisplayField="name"
              model="director"
              rowData={allDirectors}
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

DirectorsList.defaultProps = {
  filter: {},
};

DirectorsList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default DirectorsList;
