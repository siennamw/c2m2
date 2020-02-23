import React from 'react';
import PropTypes from 'prop-types';

import DetailedEntry from '../DetailedEntry';
import EntryListWithLinks from '../EntryListWithLinks';

import { REPOSITORY_BY_ID } from '../../../queries';

const DisplayRepository = ({ values }) => {
  const {
    collections,
    location,
    website,
  } = values;

  return (
    <tbody>
      <tr>
        <th>Location</th>
        <td>{location}</td>
      </tr>
      <tr>
        <th>Website</th>
        <td>
          <a
            href={website}
            target="_blank"
            rel="noopener noreferrer"
          >
            {website}
          </a>
        </td>
      </tr>
      <tr>
        <th>Collection(s)</th>
        <td>
          <EntryListWithLinks
            items={collections}
            model="collection"
          />
        </td>
      </tr>
    </tbody>
  );
};

DisplayRepository.defaultProps = {
  values: {},
};

DisplayRepository.propTypes = {
  values: PropTypes.shape({
    collections: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      }),
    ),
    location: PropTypes.string,
    website: PropTypes.string,
  }),
};

const DetailedRepository = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayRepository}
      entryTypeForDisplay="repository"
      gqlQuery={REPOSITORY_BY_ID}
      id={id}
      queryName="repository"
    />
  );
};

DetailedRepository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailedRepository;
