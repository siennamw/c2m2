/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';
import { uniqBy } from 'lodash';

import DetailedEntry from '../DetailedEntry';
import EntryListWithLinks from '../EntryListWithLinks';

import { CATALOGER_BY_ID } from '../../../queries';

const DisplayCataloger = ({ values }) => {
  const getUniqueByID = list => uniqBy(list, item => item.id);

  const {
    catalogers,
    catalogers_as_updater,
    collections,
    collections_as_updater,
    composers,
    composers_as_updater,
    countries,
    countries_as_updater,
    description,
    directors,
    directors_as_updater,
    material_formats,
    material_formats_as_updater,
    media_types,
    media_types_as_updater,
    production_companies,
    production_companies_as_updater,
    repositories,
    repositories_as_updater,
    resources,
    resources_as_updater,
    works,
    works_as_updater,
  } = values;

  // no need to filter out draft resources;
  // this route only available to authenticated catalogers
  const resourcesWithDisplayText = getUniqueByID([...resources, ...resources_as_updater])
    .map(r => ({
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
        <th>Catalogers</th>
        <td>
          <EntryListWithLinks
            items={
              getUniqueByID([
                ...catalogers,
                ...catalogers_as_updater,
              ])
            }
            model="cataloger"
          />
        </td>
      </tr>
      <tr>
        <th>Collections</th>
        <td>
          <EntryListWithLinks
            items={
              getUniqueByID([
                ...collections,
                ...collections_as_updater,
              ])
            }
            model="collection"
          />
        </td>
      </tr>
      <tr>
        <th>Composers</th>
        <td>
          <EntryListWithLinks
            items={
              getUniqueByID([
                ...composers,
                ...composers_as_updater,
              ])
            }
            model="composer"
          />
        </td>
      </tr>
      <tr>
        <th>Countries</th>
        <td>
          <EntryListWithLinks
            items={
              getUniqueByID([
                ...countries,
                ...countries_as_updater,
              ])
            }
            model="country"
          />
        </td>
      </tr>
      <tr>
        <th>Directors</th>
        <td>
          <EntryListWithLinks
            items={
              getUniqueByID([
                ...directors,
                ...directors_as_updater,
              ])
            }
            model="director"
          />
        </td>
      </tr>
      <tr>
        <th>Works</th>
        <td>
          <EntryListWithLinks
            displayFieldName="title"
            items={
              getUniqueByID([
                ...works,
                ...works_as_updater,
              ])
            }
            model="work"
          />
        </td>
      </tr>
      <tr>
        <th>Material Formats</th>
        <td>
          <EntryListWithLinks
            items={
              getUniqueByID([
                ...material_formats,
                ...material_formats_as_updater,
              ])
            }
            model="material_format"
          />
        </td>
      </tr>
      <tr>
        <th>Media Types</th>
        <td>
          <EntryListWithLinks
            items={
              getUniqueByID([
                ...media_types,
                ...media_types_as_updater,
              ])
            }
            model="media_type"
          />
        </td>
      </tr>
      <tr>
        <th>Production Companies</th>
        <td>
          <EntryListWithLinks
            items={
              getUniqueByID([
                ...production_companies,
                ...production_companies_as_updater,
              ])
            }
            model="production_company"
          />
        </td>
      </tr>
      <tr>
        <th>Repositories</th>
        <td>
          <EntryListWithLinks
            items={
              getUniqueByID([
                ...repositories,
                ...repositories_as_updater,
              ])
            }
            model="repository"
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

DisplayCataloger.defaultProps = {
  values: {},
};

DisplayCataloger.propTypes = {
  values: PropTypes.shape({
    catalogers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    catalogers_as_updater: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    collections: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    collections_as_updater: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    composers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    composers_as_updater: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    countries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    countries_as_updater: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    description: PropTypes.string,
    directors: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    directors_as_updater: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    material_formats: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    material_formats_as_updater: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    media_types: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    media_types_as_updater: PropTypes.arrayOf(
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
    production_companies_as_updater: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    repositories: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        name: PropTypes.string,
      }),
    ),
    repositories_as_updater: PropTypes.arrayOf(
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
        work: PropTypes.shape({
          title: PropTypes.string,
        }),
      }),
    ),
    resources_as_updater: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        material_format: PropTypes.shape({
          name: PropTypes.string,
        }),
        work: PropTypes.shape({
          title: PropTypes.string,
        }),
      }),
    ),
    works: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        title: PropTypes.string,
      }),
    ),
    works_as_updater: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
        title: PropTypes.string,
      }),
    ),
  }),
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

DetailedCataloger.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailedCataloger;
