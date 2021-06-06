import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import EnhancedTable from '../EnhancedTable';
import QueryWrap from '../QueryWrap';

import { SEARCH_PRODUCTION_COMPANIES } from '../../../queries';

const ProductionCompaniesList = ({ filter }) => {
  const [sortAscending, setSortAscending] = useState(true);
  const [sortBy, setSortBy] = useState('name');

  return (
    <Fragment>
      <h3>Production Companies</h3>
      <QueryWrap
        filter={filter}
        sortAscending={sortAscending}
        sortBy={sortBy}
        pagination
        query={SEARCH_PRODUCTION_COMPANIES}
        queryName="allProductionCompanies"
      >
        {
          (allProductionCompanies) => (
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
              model="production_company"
              rowData={allProductionCompanies}
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

ProductionCompaniesList.defaultProps = {
  filter: {},
};

ProductionCompaniesList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default ProductionCompaniesList;
