import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../../utils';

const DetailedEntry = ({ DisplayComponent, gqlQuery, id, queryName }) => (
  <Query query={gqlQuery} variables={{ id }}>
    {({ error, data }) => {
      let content = (
        <div className="status-message warn">Fetching...</div>
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

        content = (
          <div className="detailed-entry">
            <DisplayComponent values={values} />
            {
              isAuthenticated()
                ? (
                  <Link
                    to={`/dashboard/edit/${queryName}/${id}`}
                    className="edit-entry-link"
                  >
                    Edit This Entry
                  </Link>
                )
                : undefined
            }
          </div>
        );
      }

      return content;
    }}
  </Query>
);

DetailedEntry.propTypes = {
  DisplayComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  gqlQuery: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  queryName: PropTypes.string.isRequired,
};

export default DetailedEntry;
