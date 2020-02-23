/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import DetailedEntry from '../DetailedEntry';
import EntryListWithLinks from '../EntryListWithLinks';
import LinkToEntry from '../LinkToEntry';

import { COLLECTION_BY_ID } from '../../../queries';

const DisplayCollection = ({ values }) => {
  const {
    description,
    finding_aid_link,
    repository,
    resources,
  } = values;

  const resourcesWithDisplayText = resources.map(r => ({
    ...r,
    displayText: `${r.work.title}: ${r.material_format.name}`,
  }));

  return (
    <tbody>
      <tr>
        <th>Description</th>
        <td>{description}</td>
      </tr>
      <tr>
        <th>Finding Aid Link</th>
        <td>
          <a
            href={finding_aid_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {finding_aid_link}
          </a>
        </td>
      </tr>
      <tr>
        <th>Repository</th>
        <td>
          <LinkToEntry
            entry={repository}
            model="repository"
          />
        </td>
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

DisplayCollection.defaultProps = {
  values: {},
};

DisplayCollection.propTypes = {
  values: PropTypes.shape({
    description: PropTypes.string,
    finding_aid_link: PropTypes.string,
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
