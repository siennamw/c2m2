import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { WORK_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayWork = ({ values }) => (
  <div>
    <div className="entry-type">Work:</div>
    <h3>
      {values.title}
      {values.secondary_title ? `: ${values.secondary_title}` : ''}
    </h3>
    {
      values.alias_alternates
        ? <h4>{values.alias_alternates}</h4>
        : undefined
    }
    <table className="u-full-width">
      <tbody>
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
          <th>Year</th>
          <td>{values.year}</td>
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
          <th>Finding Aid Link</th>
          <td>
            <a
              href={values.finding_aid_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {values.finding_aid_link}
            </a>
          </td>
        </tr>
        <tr>
          <th>Digital Copy Link</th>
          <td>
            <a
              href={values.digital_copy_link}
              target="_blank"
              rel="noopener noreferrer"
            >
              {values.digital_copy_link}
            </a>
          </td>
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
          <th>Collection(s)</th>
          <td>
            {
              values.collections.map(c => (
                <div key={c.id}>{wrapWithLink(c.name, c.id, 'collection')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Rights Holder</th>
          <td>{values.rights_holder}</td>
        </tr>
        <tr>
          <th>Material Format</th>
          <td>
            {
              values.material_format
                ? wrapWithLink(values.material_format.name, values.material_format.id, 'material_format')
                : null
            }
          </td>
        </tr>
        <tr>
          <th>Publisher(s)</th>
          <td>
            {
              values.publishers.map(c => (
                <div key={c.id}>{wrapWithLink(c.name, c.id, 'publisher')}</div>
              ))
            }
          </td>
        </tr>
        <tr>
          <th>Citation Source</th>
          <td>{values.citation_source}</td>
        </tr>
        <tr>
          <th>Cataloging Notes</th>
          <td>{values.cataloging_notes}</td>
        </tr>
        <tr>
          <th>Cataloger</th>
          <td>
            {
              values.cataloger
                ? wrapWithLink(values.cataloger.name, values.cataloger.id, 'cataloger')
                : null
            }
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

const DetailedWork = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayWork}
      gqlQuery={WORK_BY_ID}
      id={id}
      queryName="work"
    />
  );
};

export default DetailedWork;
