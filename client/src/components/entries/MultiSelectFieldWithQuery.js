import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Query } from 'react-apollo';

const MultiSelectFieldWithQuery = ({
  fieldName, displayName, multiSelectOnChange, query, queryName
}) => (
  <Query query={query}>
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
        const items = data[queryName].sort((a, b) => (
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        ));

        content = (
          <Field
            name={fieldName}
            className="u-full-width"
            component="select"
            multiple
            onChange={evt => multiSelectOnChange(evt, fieldName)}
          >
            {
              items.map(i => (
                <option key={i.id} value={Number(i.id)}>{i.name}</option>
              ))
            }
          </Field>
        );
      }

      return (
        <div>
          <label htmlFor={fieldName}>
            {displayName}
            <ErrorMessage
              name={fieldName}
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

export default MultiSelectFieldWithQuery;
