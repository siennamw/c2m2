import React from 'react';
import PropTypes from 'prop-types';

import DetailedEntry from '../DetailedEntry';
import { MATERIAL_FORMAT_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayMaterialFormat = ({ values }) => {
  const { description, resources } = values;

  return (
    <tbody>
      <tr>
        <th>Description</th>
        <td>{description}</td>
      </tr>
      <tr>
        <th>Resource(s)</th>
        <td>
          {
            resources.map(r => (
              <div key={r.id}>{wrapWithLink(r.work.title, r.id, 'resource')}</div>
            ))
          }
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
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        work: PropTypes.shape({
          title: PropTypes.string,
        }),
      }),
    ),
  }),
};

const DetailedMaterialFormat = ({ match }) => {
  const id = Number(match.params.id);

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
