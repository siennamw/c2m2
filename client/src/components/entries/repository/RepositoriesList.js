import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import LinkToEntry from '../LinkToEntry';
import QueryWrap from '../QueryWrap';

import { SEARCH_REPOSITORIES } from '../../../queries';

const RepositoriesList = ({ filter }) => (
  <Fragment>
    <h3>Repositories</h3>
    <QueryWrap
      filter={filter}
      query={SEARCH_REPOSITORIES}
      queryName="allRepositories"
    >
      {
        (allRepositories) => (
          <table className="u-full-width">
            <tbody>
              <tr>
                <th>Name</th>
                <th>Location</th>
              </tr>
              {
                allRepositories.map((repository) => (
                  <tr key={repository.id}>
                    <td>
                      <LinkToEntry entry={repository} model="repository" />
                    </td>
                    <td>
                      {repository.location}
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

RepositoriesList.defaultProps = {
  filter: {},
};

RepositoriesList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default RepositoriesList;
