import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import EnhancedTable from '../EnhancedTable';
import QueryWrap from '../QueryWrap';

import { SEARCH_REPOSITORIES } from '../../../queries';

const RepositoriesList = ({ filter }) => {
  const [sortAscending, setSortAscending] = useState(true);
  const [sortBy, setSortBy] = useState('name');

  return (
    <Fragment>
      <h3>Repositories</h3>
      <QueryWrap
        filter={filter}
        pagination
        sortAscending={sortAscending}
        sortBy={sortBy}
        query={SEARCH_REPOSITORIES}
        queryName="allRepositories"
      >
        {
          (allRepositories) => (
            <EnhancedTable
              columnData={[
                {
                  label: 'Name',
                  field: 'name',
                },
                {
                  label: 'Location',
                  field: 'location',
                },
              ]}
              linkToEntryDisplayField="name"
              model="repository"
              rowData={allRepositories}
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

RepositoriesList.defaultProps = {
  filter: {},
};

RepositoriesList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default RepositoriesList;
