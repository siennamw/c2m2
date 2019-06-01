import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { FILM_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayFilm = ({ values }) => (
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
      <th>Works</th>
      <td>
        {
          values.works.map(w => (
            <div key={w.id}>{wrapWithLink(w.material_format.name, w.id, 'work')}</div>
          ))
        }
      </td>
    </tr>
  </tbody>
);

const DetailedFilm = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayFilm}
      entryTypeForDisplay="film"
      gqlQuery={FILM_BY_ID}
      id={id}
      queryName="film"
    />
  );
};

export default DetailedFilm;
