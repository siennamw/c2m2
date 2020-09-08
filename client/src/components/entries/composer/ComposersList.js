import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import LinkToEntry from '../LinkToEntry';
import QueryWrap from '../QueryWrap';

import { LIST_ALL_COMPOSERS } from '../../../queries';

const ComposersList = ({ filter }) => (
  <Fragment>
    <h3>Composers</h3>
    <QueryWrap
      filter={filter}
      query={LIST_ALL_COMPOSERS}
      queryName="allComposers"
    >
      {
        (allComposers) => (
          <table className="u-full-width">
            <tbody>
              <tr>
                <th>Name</th>
                <th>IMDB Link</th>
              </tr>
              {
                allComposers.map((composer) => (
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

ComposersList.defaultProps = {
  filter: {},
};

ComposersList.propTypes = {
  filter: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

export default ComposersList;
