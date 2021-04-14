import React, { useState } from 'react';

import EnhancedTable from '../EnhancedTable';
import QueryWrap from '../QueryWrap';

import { SEARCH_CATALOGERS } from '../../../queries';

const CatalogersList = () => {
  const [sortAscending, setSortAscending] = useState(true);
  const [sortBy, setSortBy] = useState('name');

  return (
    <QueryWrap
      sortAscending={sortAscending}
      sortBy={sortBy}
      query={SEARCH_CATALOGERS}
      queryName="allCatalogers"
    >
      {
        (allCatalogers) => (
          <EnhancedTable
            columnData={[
              {
                label: 'Name',
                field: 'name',
              },
              {
                label: 'Email',
                field: 'email',
              },
              {
                label: 'Admin?',
                field: 'admin',
              },
            ]}
            linkToEntryDisplayField="name"
            model="composer"
            rowData={allCatalogers}
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

export default CatalogersList;
