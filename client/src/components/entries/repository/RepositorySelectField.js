import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Query } from 'react-apollo';
import { LIST_ALL_REPOSITORIES } from '../../../queries';

const RepositorySelectField = () => (
  <Query query={LIST_ALL_REPOSITORIES}>
    {({ error, data }) => {
      let content = (
        <div className="form-message api-message warn">Fetching...</div>
      );

      if (error) {
        content = (
          <div className="form-message api-message error">
            Sorry! There was an error fetching the list of repositories.
          </div>
        );
      } else if (data && data.allRepositories) {
        const repositories = data.allRepositories.sort((a, b) => (
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        ));

        content = (
          <Field
            name="repository_id"
            className="u-full-width"
            component="select"
          >
            <option key="empty" value="">Select</option>
            {
              repositories.map(repo => (
                <option key={repo.id} value={Number(repo.id)}>{repo.name}</option>
              ))
            }
          </Field>
        );
      }

      return (
        <div>
          <label htmlFor="repository_id">
            Repository
            {' '}
            <ErrorMessage
              name="repository_id"
              component="div"
              className="form-message error"
            />
          </label>
          {content}
        </div>
      );
    }}
  </Query>
);

export default RepositorySelectField;
