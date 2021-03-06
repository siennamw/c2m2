/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import DetailedEntry from '../DetailedEntry';
import EntryListWithLinks from '../EntryListWithLinks';

import { PRODUCTION_COMPANY_BY_ID } from '../../../queries';

const DisplayProductionCompany = ({ values }) => {
  const { contact_info, works } = values;

  return (
    <tbody>
      <tr>
        <th>Contact Info</th>
        <td>{contact_info}</td>
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

DisplayProductionCompany.defaultProps = {
  values: {},
};

DisplayProductionCompany.propTypes = {
  values: PropTypes.shape({
    contact_info: PropTypes.string,
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

const DetailedProductionCompany = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayProductionCompany}
      entryTypeForDisplay="production company"
      gqlQuery={PRODUCTION_COMPANY_BY_ID}
      id={id}
      queryName="production_company"
    />
  );
};

DetailedProductionCompany.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailedProductionCompany;
