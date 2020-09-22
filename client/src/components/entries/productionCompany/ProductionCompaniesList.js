import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import LinkToEntry from '../LinkToEntry';
import QueryWrap from '../QueryWrap';

import { SEARCH_PRODUCTION_COMPANIES } from '../../../queries';

const ProductionCompaniesList = ({ filter }) => (
  <Fragment>
    <h3>Production Companies</h3>
    <QueryWrap
      filter={filter}
      query={SEARCH_PRODUCTION_COMPANIES}
      queryName="allProductionCompanies"
    >
      {
        (allProductionCompanies) => (
          <table className="u-full-width">
            <tbody>
              <tr>
                <th>Name</th>
              </tr>
              {
                allProductionCompanies.map((productionCompany) => (
                  <tr key={productionCompany.id}>
                    <td>
                      <LinkToEntry entry={productionCompany} model="production_company" />
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

ProductionCompaniesList.defaultProps = {
  filter: {},
};

ProductionCompaniesList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default ProductionCompaniesList;
