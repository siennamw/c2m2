import React from 'react';
import PropTypes from 'prop-types';

import EntryListWithLinks from '../EntryListWithLinks';
import QueryWrap from '../QueryWrap';

import { WORKS_SEARCH } from '../../../queries';

const WorksList = ({ filter }) => (
  <QueryWrap
    filter={filter}
    pagination
    query={WORKS_SEARCH}
    queryName="allWorks"
  >
    {
      works => (
        <table
          id="works-list-table"
          className="u-full-width"
        >
          {
            works.map(work => (
              <tbody key={work.id}>
                <tr>
                  <td colSpan="4">
                    <h4>
                      <a href={`/work/${work.id}`}>
                        {work.title}
                        {work.secondary_title ? `: ${work.secondary_title}` : ''}
                      </a>
                    </h4>
                  </td>
                </tr>
                <tr>
                  <th>Year</th>
                  <th>Composer</th>
                  <th>Director</th>
                  <th>Production Companies</th>
                </tr>
                <tr>
                  <td>{work.year}</td>
                  <td>
                    <EntryListWithLinks
                      items={work.composers}
                      model="composer"
                    />
                  </td>
                  <td>
                    <EntryListWithLinks
                      items={work.directors}
                      model="director"
                    />
                  </td>
                  <td>
                    <EntryListWithLinks
                      items={work.production_companies}
                      model="production_company"
                    />
                  </td>
                </tr>
              </tbody>
            ))
          }
        </table>
      )
    }
  </QueryWrap>
);

WorksList.defaultProps = {
  filter: {},
};

WorksList.propTypes = {
  filter: PropTypes.object,
};

export default WorksList;
