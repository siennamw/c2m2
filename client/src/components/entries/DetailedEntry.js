import React from 'react';
import { Query } from 'react-apollo';

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
          </div>
        );
      }

      return content;
    }}
  </Query>
);

export default DetailedEntry;
