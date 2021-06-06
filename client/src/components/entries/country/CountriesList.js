import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import EnhancedTable from '../EnhancedTable';
import QueryWrap from '../QueryWrap';

import { SEARCH_COUNTRIES } from '../../../queries';

const CountriesList = ({ filter }) => {
  const [sortAscending, setSortAscending] = useState(true);
  const [sortBy, setSortBy] = useState('name');

  return (
    <Fragment>
      <h3>Countries</h3>
      <QueryWrap
        filter={filter}
        pagination
        sortAscending={sortAscending}
        sortBy={sortBy}
        query={SEARCH_COUNTRIES}
        queryName="allCountries"
      >
        {
          (allCountries) => (
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
              model="country"
              rowData={allCountries}
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

CountriesList.defaultProps = {
  filter: {},
};

CountriesList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default CountriesList;
