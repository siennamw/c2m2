import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import EnhancedTable from '../EnhancedTable';
import QueryWrap from '../QueryWrap';

import { SEARCH_COMPOSERS } from '../../../queries';

const ComposersList = ({ filter }) => {
  const [sortAscending, setSortAscending] = useState(true);
  const [sortBy, setSortBy] = useState('name');

  return (
    <Fragment>
      <h3>Composers</h3>
      <QueryWrap
        filter={filter}
        sortAscending={sortAscending}
        sortBy={sortBy}
        query={SEARCH_COMPOSERS}
        queryName="allComposers"
      >
        {
          (allComposers) => (
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
              model="composer"
              rowData={allComposers}
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

ComposersList.defaultProps = {
  filter: {},
};

ComposersList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default ComposersList;
