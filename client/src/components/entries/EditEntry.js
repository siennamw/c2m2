import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import NewEntry from './NewEntry';

const EditEntry = ({
  FormComponent,
  gqlMutation,
  gqlQuery,
  id,
  queryName,
  title,
  yupSchema,
}) => (
  <Query query={gqlQuery} variables={{ id }}>
    {({ error, data }) => {
      let content = (
        <div className="status-message">Fetching...</div>
      );

      if (error) {
        content = (
          <div className="status-message error">
            Sorry! There was an error fetching data.
          </div>
        );
      } else if (data && data[queryName]) {
        // metadata
        const { selfIsAdmin } = data;
        const entryIsSelf = data[queryName].is_self;

        content = (
          <NewEntry
            FormComponent={FormComponent}
            entryIsSelf={entryIsSelf}
            gqlMutation={gqlMutation}
            initialValues={data[queryName]}
            selfIsAdmin={selfIsAdmin}
            title={title}
            yupSchema={yupSchema}
          />
        );
      }

      return content;
    }}
  </Query>
);

EditEntry.propTypes = {
  FormComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  gqlMutation: PropTypes.object.isRequired,
  gqlQuery: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  queryName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  yupSchema: PropTypes.object.isRequired,
};

export default EditEntry;
