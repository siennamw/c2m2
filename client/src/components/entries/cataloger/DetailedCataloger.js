import React from 'react';
import { uniqBy } from 'lodash';

import DetailedEntry from '../DetailedEntry';
import { CATALOGER_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayCataloger = ({ values }) => {
  const getUniqueByID = list => uniqBy(list, item => item.id);

  return (
    <tbody>
      <tr>
        <th>Description</th>
        <td>{values.description}</td>
      </tr>
      <tr>
        <th>Catalogers</th>
        <td>
          {
            getUniqueByID([
              ...values.catalogers,
              ...values.catalogers_as_updater,
            ]).map(c => (
              <div key={c.id}>{wrapWithLink(c.name, c.id, 'cataloger')}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Collections</th>
        <td>
          {
            getUniqueByID([
              ...values.collections,
              ...values.collections_as_updater,
            ]).map(c => (
              <div key={c.id}>{wrapWithLink(c.name, c.id, 'collection')}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Composers</th>
        <td>
          {
            getUniqueByID([
              ...values.composers,
              ...values.composers_as_updater,
            ]).map(c => (
              <div key={c.id}>{wrapWithLink(c.name, c.id, 'composer')}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Countries</th>
        <td>
          {
            getUniqueByID([
              ...values.countries,
              ...values.countries_as_updater,
            ]).map(c => (
              <div key={c.id}>{wrapWithLink(c.name, c.id, 'country')}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Directors</th>
        <td>
          {
            getUniqueByID([
              ...values.directors,
              ...values.directors_as_updater,
            ]).map(c => (
              <div key={c.id}>{wrapWithLink(c.name, c.id, 'director')}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Works</th>
        <td>
          {
            getUniqueByID([
              ...values.works,
              ...values.works_as_updater,
            ]).map(c => (
              <div key={c.id}>{wrapWithLink(c.title, c.id, 'work')}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Material Formats</th>
        <td>
          {
            getUniqueByID([
              ...values.material_formats,
              ...values.material_formats_as_updater,
            ]).map(c => (
              <div key={c.id}>
                {wrapWithLink(c.name, c.id, 'material_format')}
              </div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Media Types</th>
        <td>
          {
            getUniqueByID([
              ...values.media_types,
              ...values.media_types_as_updater,
            ]).map(c => (
              <div key={c.id}>{wrapWithLink(c.name, c.id, 'media_type')}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Production Companies</th>
        <td>
          {
            getUniqueByID([
              ...values.production_companies,
              ...values.production_companies_as_updater,
            ]).map(c => (
              <div key={c.id}>
                {wrapWithLink(c.name, c.id, 'production_company')}
              </div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Repositories</th>
        <td>
          {
            getUniqueByID([
              ...values.repositories,
              ...values.repositories_as_updater,
            ]).map(c => (
              <div key={c.id}>{wrapWithLink(c.name, c.id, 'repository')}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Resources</th>
        <td>
          {
            getUniqueByID([
              ...values.resources,
              ...values.resources_as_updater,
            ]).map((r) => {
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
