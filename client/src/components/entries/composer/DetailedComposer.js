/* eslint-disable camelcase */
import React from 'react';
import PropTypes from 'prop-types';

import DetailedEntry from '../DetailedEntry';
import EntryListWithLinks from '../EntryListWithLinks';

import { COMPOSER_BY_ID } from '../../../queries';

const DisplayComposer = ({ values }) => {
  const {
    imdb_link,
    works,
    works_as_orchestrator,
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
        <th>Composer for Work(s)</th>
        <td>
          <EntryListWithLinks
            displayFieldName="title"
            items={works}
            model="work"
          />
        </td>
      </tr>
      <tr>
        <th>Orchestrator for Work(s)</th>
        <td>
          <EntryListWithLinks
            displayFieldName="title"
            items={works_as_orchestrator}
            model="work"
          />
        </td>
      </tr>
    </tbody>
  );
};

DisplayComposer.defaultProps = {
  values: {},
};

DisplayComposer.propTypes = {
  values: PropTypes.shape({
    imdb_link: PropTypes.string,
    works: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      }),
    ),
    works_as_orchestrator: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        id: PropTypes.oneOfType([
          PropTypes.string,
          PropTypes.number,
        ]),
      }),
    ),
  }),
};

const DetailedComposer = ({ match }) => {
  const id = Number(match.params.id);

  return (
    <DetailedEntry
      DisplayComponent={DisplayComposer}
      entryTypeForDisplay="composer"
      gqlQuery={COMPOSER_BY_ID}
      id={id}
      queryName="composer"
    />
  );
};

DetailedComposer.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default DetailedComposer;
