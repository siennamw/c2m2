import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Query } from 'react-apollo';
import { LIST_ALL_COLLECTIONS } from '../../../queries';

const CollectionMultiSelectField = ({ multiSelectOnChange }) => (
  <Query query={LIST_ALL_COLLECTIONS}>
    {({ error, data }) => {
      let content = (
        <div className="form-message api-message warn">Fetching...</div>
      );

      if (error) {
        content = (
          <div className="form-message api-message error">
            Sorry! There was an error fetching the list of collections.
          </div>
        );
      } else if (data && data.allCollections) {
        const repositories = data.allCollections.sort((a, b) => (
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        ));

        content = (
          <Field
            name="collection_ids"
            className="u-full-width"
            component="select"
            multiple
            onChange={evt => multiSelectOnChange(evt, 'collection_ids')}
          >
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
          <label htmlFor="collection_ids">
            Collection
            <ErrorMessage
              name="collection_ids"
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

export default CollectionMultiSelectField;
