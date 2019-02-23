import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { WORK_BY_ID } from '../../../queries';

const DisplayWork = ({ values }) => (
  <div>
    <h3>
      {
        values.secondary_title
          ? `${values.title}: ${values.secondary_title}`
          : values.title
      }
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
              <div key={c.id}>{c.name}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Director(s)</th>
        <td>
          {
            values.directors.map(c => (
              <div key={c.id}>{c.name}</div>
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
              <div key={c.id}>{c.name}</div>
            ))
          }
        </td>
      </tr>
      <tr>
        <th>Finding Aid Link</th>
        <td>{values.finding_aid_link}</td>
      </tr>
      <tr>
        <th>Digital Copy Link</th>
        <td>{values.digital_copy_link}</td>
      </tr>
      <tr>
        <th>Country</th>
        <td>
          {
            values.country
              ? values.country.name
              : null
          }
        </td>
      </tr>
      <tr>
        <th>Media Type</th>
        <td>
          {
            values.media_type
              ? values.media_type.name
              : null
          }
        </td>
      </tr>
      <tr>
        <th>Collection(s)</th>
        <td>
          {
            values.collections.map(c => (
              <div key={c.id}>{c.name}</div>
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
              ? values.material_format.name
              : null
          }
        </td>
      </tr>
      <tr>
        <th>Publisher(s)</th>
        <td>
          {
            values.publishers.map(c => (
              <div key={c.id}>{c.name}</div>
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
              ? values.cataloger.name
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
