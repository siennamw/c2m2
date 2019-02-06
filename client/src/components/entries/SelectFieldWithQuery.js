import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Query } from 'react-apollo';

const SelectFieldWithQuery = ({
  fieldName, displayName, isMulti, onChangeCallback, query, queryName
}) => {
  const handleClick = () => {
    console.log('this button will open a modal');
  };

  return (
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
          )).map(i => (
            <option key={i.id} value={Number(i.id)}>{i.name}</option>
          ));

          if (isMulti) {
            content = (
              <Field
                name={fieldName}
                className="u-full-width"
                component="select"
                multiple
                onChange={evt => onChangeCallback(evt, fieldName)}
              >
                {items}
              </Field>
            );
          } else {
            content = (
              <Field
                name={fieldName}
                className="u-full-width"
                component="select"
                onChange={evt => onChangeCallback(evt, fieldName)}
              >
                <option key="none" value="">Select</option>
                {items}
              </Field>
            );
          }
        }

        const tooltip = `Add New ${displayName}`;

        return (
          <div className="select-with-query">
            <label htmlFor={fieldName}>
              {displayName}
              <ErrorMessage
                name={fieldName}
                component="div"
                className="form-message error"
              />
            </label>
            {content}
            <button
              type="button"
              onClick={handleClick}
              className="button-primary"
              title={tooltip}
            >
              +
            </button>
          </div>
        );
      }}
    </Query>
  )
};

export default SelectFieldWithQuery;
