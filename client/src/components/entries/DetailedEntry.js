import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../utils';

const DetailedEntry = ({
  DisplayComponent,
  entryTypeForDisplay,
  gqlQuery,
  id,
  queryName,
}) => (
  <Query query={gqlQuery} variables={{ id }}>
    {({ error, data }) => {
      let content = (
        <div className="status-message">Fetching...</div>
      );

      if (error) {
        const notFound = error.networkError
          ? error.networkError.statusCode === 404
          : false;
        const message = notFound
          ? 'Sorry! No matching record was found.'
          : 'Sorry! There was an error fetching data.';

        content = (
          <div className="status-message error">
            {message}
          </div>
        );
      } else if (data && data[queryName]) {
        const values = data[queryName];
        const heading = values.title
          ? (
            <h3>
              {values.title}
              {values.secondary_title ? `: ${values.secondary_title}` : ''}
            </h3>
          )
          : <h3>{values.name}</h3>;

        const pubStatus = (status) => {
          if (!['draft', 'provisional', 'approved'].includes(status)) {
            return;
          }

          let description = '';

          switch (status) {
            case 'approved':
              description = 'This entry has been reviewed and approved by a project administrator.';
              break;
            case 'provisional':
              description = 'This entry has not yet been reviewed by a project administrator.';
              break;
            case 'draft':
            default:
              description = 'This entry is a draft and can only be viewed by catalogers.';
              break;
          }

          return (
            <div className={`publication-status bar ${status}`}>
              <h3>{status}:</h3>
              <span>{description}</span>
            </div>
          );
        };

        content = (
          <div className="detailed-entry">
            <div>
              {pubStatus(values.publication_status)}
              <div className="entry-type">
                {entryTypeForDisplay}:
              </div>
              {heading}
              <table className="u-full-width">
                <DisplayComponent values={values} />
              </table>
              {
                isAuthenticated()
                  ? (
                    <div className="edit-entry-link">
                      <Link
                        to={`/dashboard/edit/${queryName}/${id}`}
                      >
                        Edit this {entryTypeForDisplay} &rarr;
                      </Link>
                    </div>
                  )
                  : undefined
              }
            </div>
          </div>
        );
      }

      return content;
    }}
  </Query>
);

DetailedEntry.defaultProps = {
  entryTypeForDisplay: 'entry',
};

DetailedEntry.propTypes = {
  DisplayComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  entryTypeForDisplay: PropTypes.string,
  gqlQuery: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  queryName: PropTypes.string.isRequired,
};

export default DetailedEntry;
