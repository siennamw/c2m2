import moment from 'moment';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Query } from '@apollo/react-components';

import NewEntry from './NewEntry';
import StatusMessage from '../StatusMessage';

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
        <StatusMessage message="Fetching..." />
      );

      if (error) {
        content = (
          <StatusMessage
            message="Sorry! There was an error fetching data."
            type="error"
          />
        );
      } else if (data && data[queryName]) {
        const createdAt = data[queryName].created_at;
        const createdBy = data[queryName].created_by;
        const updatedAt = data[queryName].updated_at;
        const updatedBy = data[queryName].updated_by;

        const createdInfo = createdAt && createdBy
          ? (
            <div className="row">
              <dl>
                <div className="six columns">
                  <dt>Created at</dt>
                  <dd>{moment.utc(createdAt, 'YYYY-MM-DD hh:mm:ss').local().format('YYYY-MM-DD LT')}</dd>
                </div>
                <div className="six columns">
                  <dt>Created by</dt>
                  <dd>{createdBy.name}</dd>
                </div>
              </dl>
            </div>
          )
          : undefined;
        const lastUpdatedInfo = updatedAt && updatedBy
          ? (
            <div className="row">
              <dl>
                <div className="six columns">
                  <dt>Last updated at</dt>
                  <dd>{moment.utc(updatedAt, 'YYYY-MM-DD hh:mm:ss').local().format('YYYY-MM-DD LT')}</dd>
                </div>
                <div className="six columns">
                  <dt>Last updated by</dt>
                  <dd>{updatedBy.name}</dd>
                </div>
              </dl>
            </div>
          )
          : undefined;

        content = (
          <Fragment>
            <NewEntry
              FormComponent={FormComponent}
              gqlMutation={gqlMutation}
              initialValues={data[queryName]}
              mutationName={mutationName}
              title={title}
              yupSchema={yupSchema}
            />
            {createdInfo}
            {lastUpdatedInfo}
          </Fragment>
        );
      }

      return content;
    }}
  </Query>
);

EditEntry.defaultProps = {
  mutationName: null,
};

EditEntry.propTypes = {
  FormComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  gqlMutation: PropTypes.object.isRequired,
  gqlQuery: PropTypes.object.isRequired,
  id: PropTypes.number.isRequired,
  mutationName: PropTypes.string,
  queryName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  yupSchema: PropTypes.object.isRequired,
};

export default EditEntry;
