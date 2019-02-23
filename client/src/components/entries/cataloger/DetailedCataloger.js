import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { CATALOGER_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayCataloger = ({ values }) => (
  <div>
    <div className="entry-type">Cataloger:</div>
    <h3>{values.name}</h3>
    <table className="u-full-width">
      <tbody>
        <tr>
          <th>Description</th>
          <td>{values.description}</td>
        </tr>
        <tr>
          <th>Created By</th>
          <td>
            {
              values.created_by
                ? wrapWithLink(values.created_by.name, values.created_by.id, 'cataloger')
                : null
            }
          </td>
        </tr>
        <tr>
          <th>Catalogers</th>
          <td>
            {
              values.catalogers.map(c => (
                <div key={c.id}>{wrapWithLink(c.name, c.id, 'cataloger')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Collections</th>
          <td>
            {
              values.collections.map(c => (
                <div key={c.id}>{wrapWithLink(c.name, c.id, 'collection')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Composers</th>
          <td>
            {
              values.composers.map(c => (
                <div key={c.id}>{wrapWithLink(c.name, c.id, 'composer')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Countries</th>
          <td>
            {
              values.countries.map(c => (
                <div key={c.id}>{wrapWithLink(c.name, c.id, 'country')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Directors</th>
          <td>
            {
              values.directors.map(c => (
                <div key={c.id}>{wrapWithLink(c.name, c.id, 'director')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Material Formats</th>
          <td>
            {
              values.material_formats.map(c => (
                <div key={c.id}>{wrapWithLink(c.name, c.id, 'material_format')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Media Types</th>
          <td>
            {
              values.media_types.map(c => (
                <div key={c.id}>{wrapWithLink(c.name, c.id, 'media_type')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Production Companies</th>
          <td>
            {
              values.production_companies.map(c => (
                <div key={c.id}>{wrapWithLink(c.name, c.id, 'production_company')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Publishers</th>
          <td>
            {
              values.publishers.map(c => (
                <div key={c.id}>{wrapWithLink(c.name, c.id, 'publisher')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Repositories</th>
          <td>
            {
              values.repositories.map(c => (
                <div key={c.id}>{wrapWithLink(c.name, c.id, 'repository')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Works</th>
          <td>
            {
              values.works.map(c => (
                <div key={c.id}>{wrapWithLink(c.title, c.id, 'work')}</div>
              ))
            }
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const DetailedCataloger = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayCataloger}
      gqlQuery={CATALOGER_BY_ID}
      id={id}
      queryName="cataloger"
    />
  );
};

export default DetailedCataloger;
