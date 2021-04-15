import React, { useState } from 'react';

import EnhancedTable from '../EnhancedTable';
import QueryWrap from '../QueryWrap';

import { SEARCH_RESOURCES } from '../../../queries';

const ResourcesList = () => {
  const [sortAscending, setSortAscending] = useState(false);
  const [sortBy, setSortBy] = useState('updated_at');

  return (
    <QueryWrap
      query={SEARCH_RESOURCES}
      queryName="allResources"
      sortAscending={sortAscending}
      sortBy={sortBy}
    >
      {
        (resources) => (
          <EnhancedTable
            columnData={[
              {
                field: 'work',
                label: 'Work',
              },
              {
                field: 'material_format',
                label: 'Material Format',
              },
              {
                field: 'collection',
                label: 'Collection',
              },
              {
                field: 'publication_status',
                label: 'Publication Status',
              },
            ]}
            model="resource"
            rowData={resources}
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

export default ResourcesList;
