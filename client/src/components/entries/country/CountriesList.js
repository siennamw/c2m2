import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import LinkToEntry from '../LinkToEntry';
import QueryWrap from '../QueryWrap';

import { SEARCH_COUNTRIES } from '../../../queries';

const CountriesList = ({ filter }) => (
  <Fragment>
    <h3>Countries</h3>
    <QueryWrap
      filter={filter}
      query={SEARCH_COUNTRIES}
      queryName="allCountries"
    >
      {
        (allCountries) => (
          <table className="u-full-width">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Description</th>
              </tr>
              {
                allCountries.map((country) => (
                  <tr key={country.id}>
                    <td>
                      <LinkToEntry entry={country} model="country" />
                    </td>
                    <td>
                      {country.description}
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        )
      }
    </QueryWrap>
  </Fragment>
);

CountriesList.defaultProps = {
  filter: {},
};

CountriesList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default CountriesList;
