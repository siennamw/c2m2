import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { CATALOGER_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayCataloger = ({ values }) => (
  <tbody>
    <tr>
      <th>Description</th>
      <td>{values.description}</td>
    </tr>
    <tr>
      <th>Catalogers</th>
      <td>
        {
          [...values.catalogers, ...values.catalogers_as_updater].map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'cataloger')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Collections</th>
      <td>
        {
          [...values.collections, ...values.collections_as_updater].map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'collection')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Composers</th>
      <td>
        {
          [...values.composers, ...values.composers_as_updater].map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'composer')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Countries</th>
      <td>
        {
          [...values.countries, ...values.countries_as_updater].map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'country')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Directors</th>
      <td>
        {
          [...values.directors, ...values.directors_as_updater].map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'director')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Films</th>
      <td>
        {
          [...values.films, ...values.films_as_updater].map(c => (
            <div key={c.id}>{wrapWithLink(c.title, c.id, 'film')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Material Formats</th>
      <td>
        {
          [...values.material_formats, ...values.material_formats_as_updater].map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'material_format')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Media Types</th>
      <td>
        {
          [...values.media_types, ...values.media_types_as_updater].map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'media_type')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Production Companies</th>
      <td>
        {
          [...values.production_companies, ...values.production_companies_as_updater].map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'production_company')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Publishers</th>
      <td>
        {
          [...values.publishers, ...values.publishers_as_updater].map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'publisher')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Repositories</th>
      <td>
        {
          [...values.repositories, ...values.repositories_as_updater].map(c => (
            <div key={c.id}>{wrapWithLink(c.name, c.id, 'repository')}</div>
          ))
        }
      </td>
    </tr>
    <tr>
      <th>Works</th>
      <td>
        {
          [...values.works, ...values.works_as_updater].map((c) => {
            const text = `${c.film.title}: ${c.material_format.name}`;
            return (
              <div key={c.id}>{wrapWithLink(text, c.id, 'work')}</div>
            );
          })
        }
      </td>
    </tr>
  </tbody>
);

const DetailedCataloger = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayCataloger}
      entryTypeForDisplay="cataloger"
      gqlQuery={CATALOGER_BY_ID}
      id={id}
      queryName="cataloger"
    />
  );
};

export default DetailedCataloger;
