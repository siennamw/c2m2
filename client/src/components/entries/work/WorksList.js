import React, { useState } from 'react';
import PropTypes from 'prop-types';

import EnhancedTable from '../EnhancedTable';
import QueryWrap from '../QueryWrap';

import { SEARCH_WORKS } from '../../../queries';

const WorksList = ({ initialSortField, initialSortAscending, filter }) => {
  const [sortAscending, setSortAscending] = useState(initialSortAscending);
  const [sortBy, setSortBy] = useState(initialSortField);

  return (
    <QueryWrap
      filter={filter}
      query={SEARCH_WORKS}
      queryName="allWorks"
      sortAscending={sortAscending}
      sortBy={sortBy}
    >
      {
        (works) => (
          <EnhancedTable
            columnData={[
              {
                field: 'title',
                label: 'Title',
              },
              {
                field: 'secondary_title',
                label: 'Secondary Title',
              },
              {
                field: 'year',
                label: 'Year',
              },
              {
                disableSorting: true,
                field: 'composers',
                label: 'Composer(s)',
              },
              {
                disableSorting: true,
                field: 'directors',
                label: 'Director(s)',
              },
              {
                disableSorting: true,
                field: 'production_companies',
                label: 'Production Companies',
              },
            ]}
            linkToEntryDisplayField="title"
            model="work"
            rowData={works}
            setSortAscending={setSortAscending}
            setSortBy={setSortBy}
            sortAscending={sortAscending}
            sortBy={sortBy}
          />
        )
      }
    </QueryWrap>
  );
};

WorksList.defaultProps = {
  initialSortAscending: true,
  initialSortField: 'title',
  filter: {},
};

WorksList.propTypes = {
  initialSortAscending: PropTypes.bool,
  initialSortField: PropTypes.string,
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default WorksList;
