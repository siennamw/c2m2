/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import DetailedEntry from '../DetailedEntry';
import { DIRECTOR_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayDirector = ({ values }) => {
  const {
    imdb_link,
    works,
  } = values;

  return (
    <tbody>
      <tr>
        <th>IMDB Link</th>
        <td>
          <a
            href={imdb_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {imdb_link}
          </a>
        </td>
      </tr>
      <tr>
        <th>Work(s)</th>
        <td>
          {
            works.map(w => (
              <div key={w.id}>{wrapWithLink(w.title, w.id, 'work')}</div>
            ))
          }
        </td>
      </tr>
    </tbody>
  );
};

DisplayDirector.defaultProps = {
  values: {},
};

DisplayDirector.propTypes = {
  values: PropTypes.shape({
    imdb_link: PropTypes.string,
    works: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      }),
    ),
  }),
};

const DetailedDirector = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayDirector}
      entryTypeForDisplay="director"
      gqlQuery={DIRECTOR_BY_ID}
      id={id}
      queryName="director"
    />
  );
};

DetailedDirector.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailedDirector;
