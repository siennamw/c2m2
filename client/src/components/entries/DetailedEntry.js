import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Query } from '@apollo/react-components';
import { Link } from 'react-router-dom';

import StatusMessage from '../StatusMessage';

import { AuthContext } from '../AuthContext';

const DetailedEntry = ({
  DisplayComponent,
  entryTypeForDisplay,
  gqlQuery,
  id,
  queryName,
}) => {
  const { authenticated } = useContext(AuthContext);

  return (
    <Query query={gqlQuery} variables={{ id }}>
      {({ error, data }) => {
        let content = (
          <StatusMessage message="Fetching..." />
        );

        if (error) {
          const notFound = error.networkError
            ? error.networkError.statusCode === 404
            : false;
          const message = notFound
            ? 'Sorry! No matching record was found.'
            : 'Sorry! There was an error fetching data.';

          content = (
            <StatusMessage message={message} type="error" />
          );
        } else if (data && data[queryName]) {
          const values = data[queryName];

          let heading;
          if (values.title) {
            heading = (
              <h3>
                {values.title}
                {values.secondary_title ? `: ${values.secondary_title}` : ''}
              </h3>
            );
          } else if (values.name) {
            heading = <h3>{values.name}</h3>;
          }

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
                <span className="h3">
                  {`${status}:`}
                </span>
                <span>{description}</span>
              </div>
            );
          };

          content = (
            <div className="detailed-entry">
              <div>
                {pubStatus(values.publication_status)}
                <div className="entry-type">
                  {`${entryTypeForDisplay}:`}
                </div>
                {heading}
                <table className="u-full-width">
                  <DisplayComponent values={values} />
                </table>
                {
                  authenticated
                    ? (
                      <div className="edit-entry-link">
                        <Link to={`/dashboard/edit/${queryName}/${id}`}>
                          {`Edit this ${entryTypeForDisplay} \u2192`}
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
};

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
