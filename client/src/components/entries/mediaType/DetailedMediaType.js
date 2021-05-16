import React from 'react';
import PropTypes from 'prop-types';

import DetailedEntry from '../DetailedEntry';
import EntryListWithLinks from '../EntryListWithLinks';

import { MEDIA_TYPE_BY_ID } from '../../../queries';

const DisplayMediaType = ({ values }) => {
  const { description, works } = values;

  return (
    <tbody>
      <tr>
        <th>Description</th>
        <td>{description}</td>
      </tr>
      <tr>
        <th>Work(s)</th>
        <td>
          <EntryListWithLinks
            displayFieldName="title"
            items={works}
            model="work"
          />
        </td>
      </tr>
    </tbody>
  );
};

DisplayMediaType.defaultProps = {
  values: {},
};

DisplayMediaType.propTypes = {
  values: PropTypes.shape({
    description: PropTypes.string,
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

const DetailedMediaType = ({ match }) => {
  const id = match && match.params && match.params.id
    ? Number(match.params.id)
    : null;

  return (
    <DetailedEntry
      DisplayComponent={DisplayMediaType}
      entryTypeForDisplay="media type"
      gqlQuery={MEDIA_TYPE_BY_ID}
      id={id}
      queryName="media_type"
    />
  );
};

DetailedMediaType.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailedMediaType;
