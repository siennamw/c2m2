import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import EntryListWithLinks from './EntryListWithLinks';
import LinkToEntry from './LinkToEntry';
import PublicationStatusBanner from './PublicationStatusBanner';

import { MODEL_NAMES } from '../../constants';
import { fieldNameToSingular } from '../../utils';

const EnhancedTable = ({
  columnData,
  disableSorting,
  linkToEntryDisplayField,
  model,
  rowData,
  setSortAscending,
  setSortBy,
  sortAscending,
  sortBy,
}) => {
  const handleClickHeading = (field) => {
    if (sortBy === field) {
      setSortAscending(!sortAscending);
    } else {
      setSortBy(field);
      setSortAscending(true);
    }
  };

  const getColumnButtonLabel = (col) => {
    if (col.field === sortBy) {
      const arrow = sortAscending
        ? <span>&nbsp;&uarr;</span>
        : <span>&nbsp;&darr;</span>;

      return (
        <Fragment>
          {col.label}
          {arrow}
        </Fragment>
      );
    }
    return col.label;
  };

  const formatHeadingCell = (col) => {
    if (disableSorting || col.disableSorting || MODEL_NAMES.includes(col.field)) {
      return col.label;
    }
    return (
      <button
        className="link"
        type="button"
        onClick={() => handleClickHeading(col.field)}
        title={
          sortBy === col.field && sortAscending
            ? `sort by ${col.label} descending`
            : `sort by ${col.label} ascending`
        }
      >
        {getColumnButtonLabel(col)}
      </button>
    );
  };

  const formatCell = (row, fieldName) => {
    if (Array.isArray(row[fieldName])) {
      return (
        <EntryListWithLinks
          items={row[fieldName]}
          model={fieldNameToSingular(fieldName)}
        />
      )
    }

    if (MODEL_NAMES.includes(fieldName)) {
      let displayField = null;
      if (row[fieldName].name) {
        displayField = 'name';
      } else if (row[fieldName].title) {
        displayField = 'title';
      }
      return (
        <LinkToEntry
          displayField={displayField}
          entry={row[fieldName]}
          model={fieldName}
        />
      )
    }

    if (linkToEntryDisplayField === fieldName) {
      // link to entry
      return (
        <LinkToEntry
          displayField={linkToEntryDisplayField}
          entry={row}
          model={model}
        />
      );
    }

    if (fieldName === 'imdb_link') {
      // link to IMDB entry
      return (
        <a
          href={row[fieldName]}
          rel="noopener noreferrer"
          target="_blank"
        >
          {row[fieldName]}
        </a>
      );
    }

    if (fieldName === 'publication_status') {
      return (
        <PublicationStatusBanner publicationStatus={row[fieldName]} />
      );
    }

    if (fieldName === 'email') {
      // email link
      return (
        <a
          href={`mailto:${row[fieldName]}`}
        >
          {row[fieldName]}
        </a>
      );
    }

    if (typeof row[fieldName] === 'boolean') {
      // boolean to yes/no
      return row[fieldName]
        ? 'Yes'
        : 'No';
    }

    return row[fieldName];
  };

  return (
    <table className="u-full-width">
      <thead>
      <tr>
        {
          linkToEntryDisplayField
            ? null
            : <th key="link-to-entry" />
        }
        {
          columnData.map((col) => (
            <th key={col.field}>
              {formatHeadingCell(col)}
            </th>
          ))
        }
      </tr>
      </thead>
      <tbody>
      {
        rowData.map((row) => (
          <tr key={row.id}>
            {
              linkToEntryDisplayField
                ? null
                : (
                  <td>
                    <LinkToEntry
                      entry={row}
                      model={model}
                    />
                  </td>
                )
            }
            {
              columnData.map((col) => {
                return (
                  <td key={col.field}>
                    {formatCell(row, col.field)}
                  </td>
                );
              })
            }
          </tr>
        ))
      }
      </tbody>
    </table>
  );
};

EnhancedTable.propTypes = {
  columnData: PropTypes.arrayOf(
    PropTypes.shape({
      disableSorting: PropTypes.bool,
      field: PropTypes.string.isRequired,
      label: PropTypes.string,
    }),
  ),
  disableSorting: PropTypes.bool,
  linkToEntryDisplayField: PropTypes.string,
  model: PropTypes.oneOf(MODEL_NAMES).isRequired,
  rowData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
      ]).isRequired,
    }),
  ),
  setSortAscending: PropTypes.func,
  setSortBy: PropTypes.func,
  sortAscending: PropTypes.bool,
  sortBy: PropTypes.string,
};

EnhancedTable.defaultProps = {
  columnData: [],
  disableSorting: false,
  linkToEntryDisplayField: null,
  rowData: [],
  setSortAscending: () => {},
  setSortBy: () => {},
  sortAscending: true,
  sortBy: 'id',
};

export default EnhancedTable;
