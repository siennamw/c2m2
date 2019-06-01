import React from 'react';

import DetailedEntry from '../DetailedEntry';
import { WORK_BY_ID } from '../../../queries';
import { wrapWithLink } from '../../../utils';

const DisplayWork = ({ values }) => (
  <tbody>
    <tr>
      <th>Film</th>
      <td>{wrapWithLink(values.film.title, values.film.id, 'film')}</td>
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
