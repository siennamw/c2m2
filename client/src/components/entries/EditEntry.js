import moment from 'moment';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import NewEntry from './NewEntry';

const EditEntry = ({
  FormComponent,
  gqlMutation,
  gqlQuery,
  id,
  mutationName,
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

        const createdAt = data[queryName].created_at;
        const createdBy = data[queryName].created_by;
        const updatedAt = data[queryName].updated_at;
        const updatedBy = data[queryName].updated_by;

        const createdInfo = createdAt && createdBy
          ? (
            <p className="center-text">
              Created {moment(createdAt, 'YYYY-MM-DD hh:mm:ss').utc().format('YYYY-MM-DD hh:mm')} by {createdBy.name}
            </p>
          )
          : undefined;
        const lastUpdatedInfo = updatedAt && updatedBy
          ? (
            <p className="center-text">
              Last updated {moment(updatedAt, 'YYYY-MM-DD hh:mm:ss').utc().format('YYYY-MM-DD hh:mm')} by {updatedBy.name}
            </p>
          )
          : undefined;

        content = (
          <Fragment>
            <NewEntry
              FormComponent={FormComponent}
              entryIsSelf={entryIsSelf}
              gqlMutation={gqlMutation}
              initialValues={data[queryName]}
              mutationName={mutationName}
              selfIsAdmin={selfIsAdmin}
              title={title}
              yupSchema={yupSchema}
            />
            { createdInfo }
            { lastUpdatedInfo }
          </Fragment>
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
