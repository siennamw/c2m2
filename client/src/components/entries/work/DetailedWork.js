import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { WORK_BY_ID } from '../../../queries';
import { isAuthenticated, wrapWithLink } from '../../../utils';

const DisplayWork = ({ values }) => (
  <tbody>
    <tr>
      <th>IMDB Link</th>
      <td>
        <a
          href={values.imdb_link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {values.imdb_link}
        </a>
      </td>
    </tr>
    <tr>
      <th>Aliases / Alternate Titles</th>
      <td>{values.alias_alternates}</td>
    </tr>
    <tr>
      <th>Year</th>
      <td>{values.year}</td>
    </tr>
    <tr>
      <th>Country</th>
      <td>
        {
          values.country
            ? wrapWithLink(values.country.name, values.country.id, 'country')
            : null
        }
      </td>
    </tr>
    <tr>
      <th>Media Type</th>
      <td>
        {
          values.media_type
            ? wrapWithLink(values.media_type.name, values.media_type.id, 'media_type')
            : null
        }
      </td>
    </tr>
    <tr>
      <th>Composer(s)</th>
      <td>
        {
          values.composers.map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'composer')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Orchestrator(s)</th>
      <td>
        {
          values.orchestrators.map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'composer')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Director(s)</th>
      <td>
        {
          values.directors.map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'director')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Production Company or Companies</th>
      <td>
        {
          values.production_companies.map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'production_company')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Resources</th>
      <td>
        {
          values.resources.reduce((result, r) => {
            if (isAuthenticated() || r.publication_status !== 'draft') {
              result.push(
                <div key={r.id}>
                  {wrapWithLink(r.material_format.name, r.id, 'resource')}
                </div>
              );
            }
            return result;
          }, [])
        }
      </td>
    </tr>
  </tbody>
);

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

export default DetailedWork;
