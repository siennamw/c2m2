import React from 'react';
import PropTypes from 'prop-types';

import DetailedEntry from '../DetailedEntry';
import { COLLECTION_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayCollection = ({ values }) => {
  const { description, repository, resources } = values;

  return (
    <tbody>
      <tr>
        <th>Description</th>
        <td>{description}</td>
      </tr>
      <tr>
        <th>Repository</th>
        <td>
          {wrapWithLink(repository.name, repository.id, 'repository')}
        </td>
      </tr>
      <tr>
        <th>Resource(s)</th>
        <td>
          {
            resources.map((r) => {
              const text = `${r.work.title}: ${r.material_format.name}`;
              return (
                <div key={r.id}>{wrapWithLink(text, r.id, 'resource')}</div>
              );
            })
          }
        </td>
      </tr>
    </tbody>
  );
};

DisplayCollection.defaultProps = {
  values: {},
};

DisplayCollection.propTypes = {
  values: PropTypes.shape({
    description: PropTypes.string,
    repository: PropTypes.shape({
      name: PropTypes.string,
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
    }),
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        work: PropTypes.shape({
          title: PropTypes.string,
        }),
        material_format: PropTypes.shape({
          name: PropTypes.string,
        }),
      }),
    ),
  }),
};

const DetailedCollection = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayCollection}
      entryTypeForDisplay="collection"
      gqlQuery={COLLECTION_BY_ID}
      id={id}
      queryName="collection"
    />
  );
};

DetailedCollection.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailedCollection;
