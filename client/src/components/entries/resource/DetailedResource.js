/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import DetailedEntry from '../DetailedEntry';
import LinkToEntry from '../LinkToEntry';
import EntryListWithLinks from '../EntryListWithLinks';

import { RESOURCE_BY_ID } from '../../../queries';

const DisplayResource = ({ values }) => {
  const {
    cataloging_notes,
    citation_source,
    collections,
    digital_copy_link,
    material_format,
    work,
  } = values;

  return (
    <tbody>
      <tr>
        <th>Work</th>
        <td>
          <LinkToEntry
            displayField="title"
            entry={work}
            model="work"
          />
        </td>
      </tr>
      <tr>
        <th>Material Format</th>
        <td>
          <LinkToEntry
            displayField="name"
            entry={material_format}
            model="material_format"
          />
        </td>
      </tr>
      <tr>
        <th>Digital Copy Link</th>
        <td>
          <a
            href={digital_copy_link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {digital_copy_link}
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
      <tr>
        <th>Citation Source</th>
        <td>{citation_source}</td>
      </tr>
      <tr>
        <th>Cataloging Notes</th>
        <td>{cataloging_notes}</td>
      </tr>
    </tbody>
  );
};

DisplayResource.defaultProps = {
  values: {},
};

DisplayResource.propTypes = {
  values: PropTypes.shape({
    cataloging_notes: PropTypes.string,
    citation_source: PropTypes.string,
    collections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    digital_copy_link: PropTypes.string,
    material_format: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      name: PropTypes.string,
    }),
    work: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      title: PropTypes.string,
    }),
  }),
};

const DetailedResource = ({ match }) => {
  const id = match && match.params && match.params.id
    ? Number(match.params.id)
    : null;

  return (
    <DetailedEntry
      DisplayComponent={DisplayResource}
      entryTypeForDisplay="resource"
      gqlQuery={RESOURCE_BY_ID}
      id={id}
      queryName="resource"
    />
  );
};

DetailedResource.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailedResource;
