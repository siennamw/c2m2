import React, { useState } from 'react';
import PropTypes from 'prop-types';

import EnhancedTable from '../EnhancedTable';
import QueryWrap from '../QueryWrap';

import { SEARCH_WORKS } from '../../../queries';

const WorksList = ({ filter }) => {
  const [sortAscending, setSortAscending] = useState(true);
  const [sortBy, setSortBy] = useState('title');

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
  filter: {},
};

WorksList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default WorksList;
