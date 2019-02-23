import React from 'react';
import { Query } from 'react-apollo';

const DetailedEntry = ({ DisplayComponent, gqlQuery, id, queryName }) => (
  <Query query={gqlQuery} variables={{ id }}>
    {({ error, data }) => {
      let content = (
        <div className="form-message api-message warn">Fetching...</div>
      );

      if (error) {
        content = (
          <div className="form-message api-message error">
            Sorry! There was an error fetching data.
          </div>
        );
      } else if (data && data[queryName]) {
        const values = data[queryName];
        console.log(values);

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
