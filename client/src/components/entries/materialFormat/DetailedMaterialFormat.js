import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../AuthContext';

import DetailedEntry from '../DetailedEntry';
import EntryListWithLinks from '../EntryListWithLinks';

import { MATERIAL_FORMAT_BY_ID } from '../../../queries';

const DisplayMaterialFormat = ({ values }) => {
  const { authenticated } = useContext(AuthContext);
  const { description, resources } = values;

  const resourcesWithDisplayText = resources.reduce((result, r) => {
    if (authenticated || r.publication_status !== 'draft') {
      result.push({
        ...r,
        displayText: r.work.title,
      });
    }
    return result;
  }, []);

  return (
    <tbody>
      <tr>
        <th>Description</th>
        <td>{description}</td>
      </tr>
      <tr>
        <th>Resource(s)</th>
        <td>
          <EntryListWithLinks
            displayFieldName="displayText"
            items={resourcesWithDisplayText}
            model="resource"
          />
        </td>
      </tr>
    </tbody>
  );
};

DisplayMaterialFormat.defaultProps = {
  values: {},
};

DisplayMaterialFormat.propTypes = {
  values: PropTypes.shape({
    description: PropTypes.string,
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        work: PropTypes.shape({
          title: PropTypes.string,
        }),
      }),
    ),
  }),
};

const DetailedMaterialFormat = ({ match }) => {
  const id = match && match.params && match.params.id
    ? match.params.id
    : null;

  return (
    <DetailedEntry
      DisplayComponent={DisplayMaterialFormat}
      entryTypeForDisplay="material format"
      gqlQuery={MATERIAL_FORMAT_BY_ID}
      id={id}
      queryName="material_format"
    />
  );
};

DetailedMaterialFormat.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailedMaterialFormat;
