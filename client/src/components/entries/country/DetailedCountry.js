import React from 'react';
import PropTypes from 'prop-types';

import DetailedEntry from '../DetailedEntry';
import EntryListWithLinks from '../EntryListWithLinks';

import { COUNTRY_BY_ID } from '../../../queries';

const DisplayCountry = ({ values }) => {
  const { description, works } = values;

  return (
    <tbody>
      <tr>
        <th>Description</th>
        <td>
          {description}
        </td>
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

DisplayCountry.defaultProps = {
  values: {},
};

DisplayCountry.propTypes = {
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

const DetailedCountry = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayCountry}
      entryTypeForDisplay="country"
      gqlQuery={COUNTRY_BY_ID}
      id={id}
      queryName="country"
    />
  );
};

DetailedCountry.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailedCountry;
