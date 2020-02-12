/* eslint-disable camelcase */
import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import DetailedEntry from '../DetailedEntry';
import { AuthContext } from '../../AuthContext';
import { WORK_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

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
              ? wrapWithLink(country.name, country.id, 'country')
              : null
          }
        </td>
      </tr>
      <tr>
        <th>Media Type</th>
        <td>
          {
            media_type
              ? wrapWithLink(media_type.name, media_type.id, 'media_type')
              : null
          }
        </td>
      </tr>
      <tr>
        <th>Composer(s)</th>
        <td>
          {
            composers.map(c => (
              <div key={c.id}>{wrapWithLink(c.name, c.id, 'composer')}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Orchestrator(s)</th>
        <td>
          {
            orchestrators.map(c => (
              <div key={c.id}>{wrapWithLink(c.name, c.id, 'composer')}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Director(s)</th>
        <td>
          {
            directors.map(c => (
              <div key={c.id}>{wrapWithLink(c.name, c.id, 'director')}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Production Company or Companies</th>
        <td>
          {
            production_companies.map(c => (
              <div key={c.id}>
                {wrapWithLink(c.name, c.id, 'production_company')}
              </div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Resources</th>
        <td>
          {
            resources.reduce((result, r) => {
              if (authenticated || r.publication_status !== 'draft') {
                result.push((
                  <div key={r.id}>
                    {wrapWithLink(r.material_format.name, r.id, 'resource')}
                  </div>
                ));
              }
              return result;
            }, [])
          }
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
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    country: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      name: PropTypes.string,
    }),
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    imdb_link: PropTypes.string,
    media_type: PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]),
      name: PropTypes.string,
    }),
    orchestrators: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    production_companies: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    resources: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
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
  const id = Number(match.params.id);

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
