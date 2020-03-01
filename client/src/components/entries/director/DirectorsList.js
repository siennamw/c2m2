import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import LinkToEntry from '../LinkToEntry';
import QueryWrap from '../QueryWrap';

import { LIST_ALL_DIRECTORS } from '../../../queries';

const DirectorsList = ({ filter }) => (
  <Fragment>
    <h3>Directors</h3>
    <QueryWrap
      filter={filter}
      query={LIST_ALL_DIRECTORS}
      queryName="allDirectors"
    >
      {
        allDirectors => (
          <table className="u-full-width">
            <tbody>
              <tr>
                <th>Name</th>
                <th>IMDB Link</th>
              </tr>
              {
                allDirectors.map(composer => (
                  <tr>
                    <td>
                      <LinkToEntry entry={composer} model="composer" />
                    </td>
                    <td>
                      <a
                        href={composer.imdb_link}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        {composer.imdb_link}
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
  filter: PropTypes.object,
};

export default DirectorsList;
