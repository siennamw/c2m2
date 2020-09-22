import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import LinkToEntry from '../LinkToEntry';
import QueryWrap from '../QueryWrap';

import { SEARCH_DIRECTORS } from '../../../queries';

const DirectorsList = ({ filter }) => (
  <Fragment>
    <h3>Directors</h3>
    <QueryWrap
      filter={filter}
      query={SEARCH_DIRECTORS}
      queryName="allDirectors"
    >
      {
        (allDirectors) => (
          <table className="u-full-width">
            <tbody>
              <tr>
                <th>Name</th>
                <th>IMDB Link</th>
              </tr>
              {
                allDirectors.map((director) => (
                  <tr key={director.id}>
                    <td>
                      <LinkToEntry entry={director} model="director" />
                    </td>
                    <td>
                      <a
                        href={director.imdb_link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {director.imdb_link}
                      </a>
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

DirectorsList.defaultProps = {
  filter: {},
};

DirectorsList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default DirectorsList;
