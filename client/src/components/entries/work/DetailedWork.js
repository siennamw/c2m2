/* eslint-disable camelcase */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../AuthContext';

import DetailedEntry from '../DetailedEntry';
import EntryListWithLinks from '../EntryListWithLinks';
import LinkToEntry from '../LinkToEntry';

import { WORK_BY_ID } from '../../../queries';

const DisplayWork = ({ values }) => {
  const { authenticated } = useContext(AuthContext);
  const {
    alias_alternates,
    composers,
    country,
    directors,
    imdb_link,
    media_type,
    orchestrators,
    production_companies,
    resources,
    year,
  } = values;

  const resourcesWithDisplayText = resources.reduce((result, r) => {
    if (authenticated || r.publication_status !== 'draft') {
      let displayText = r.material_format.name;
      if (r.collections && r.collections.length > 0) {
        const repositories = r.collections.reduce((all, collection) => {
          if (collection.repository) {
            all.push(`${collection.repository.name}, ${collection.repository.location}`);
          }
          return all;
        }, []).join('; ');

        displayText = `${displayText} (${repositories})`;
      }

      result.push({
        ...r,
        displayText,
      });
    }
    return result;
  }, []);

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
        <th>Aliases / Alternate Titles</th>
        <td>{alias_alternates}</td>
      </tr>
      <tr>
        <th>Year</th>
        <td>{year}</td>
      </tr>
      <tr>
        <th>Country</th>
        <td>
          {
            country
              ? (
                <LinkToEntry
                  displayField="name"
                  entry={country}
                  model="country"
                />
              )
              : null
          }
        </td>
      </tr>
      <tr>
        <th>Media Type</th>
        <td>
          {
            media_type
              ? (
                <LinkToEntry
                  displayField="name"
                  entry={media_type}
                  model="media_type"
                />
              )
              : null
          }
        </td>
      </tr>
      <tr>
        <th>Composer(s)</th>
        <td>
          <EntryListWithLinks
            items={composers}
            model="composer"
          />
        </td>
      </tr>
      <tr>
        <th>Orchestrator(s)</th>
        <td>
          <EntryListWithLinks
            items={orchestrators}
            model="composer"
          />
        </td>
      </tr>
      <tr>
        <th>Director(s)</th>
        <td>
          <EntryListWithLinks
            items={directors}
            model="director"
          />
        </td>
      </tr>
      <tr>
        <th>Production Company or Companies</th>
        <td>
          <EntryListWithLinks
            items={production_companies}
            model="production_company"
          />
        </td>
      </tr>
      <tr>
        <th>Resources</th>
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

DisplayWork.defaultProps = {
  values: {},
};

DisplayWork.propTypes = {
  values: PropTypes.shape({
    alias_alternates: PropTypes.string,
    composers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    country: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    imdb_link: PropTypes.string,
    media_type: PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
    }),
    orchestrators: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    production_companies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
      }),
    ),
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        material_format: PropTypes.shape({
          name: PropTypes.string,
        }),
        publication_status: PropTypes.string,
      }),
    ),
    year: PropTypes.number,
  }),
};

const DetailedWork = ({ match }) => {
  const id = match && match.params && match.params.id
    ? match.params.id
    : null;

  return (
    <DetailedEntry
      DisplayComponent={DisplayWork}
      entryTypeForDisplay="work"
      gqlQuery={WORK_BY_ID}
      id={id}
      queryName="work"
    />
  );
};

DetailedWork.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailedWork;
