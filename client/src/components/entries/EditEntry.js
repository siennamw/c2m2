import moment from 'moment';
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import NewEntry from './NewEntry';
import QueryWrap from './QueryWrap';

import * as mutations from '../../mutations';
import * as queries from '../../queries';

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
  <QueryWrap
    id={id}
    limit={1}
    pagination={false}
    query={gqlQuery}
    queryName={queryName}
  >
    {
      (data) => {
        const {
          created_at: createdAt,
          created_by: createdBy,
          updated_at: updatedAt,
          updated_by: updatedBy,
        } = data;

        const createdInfo = !createdAt || !createdBy
          ? null
          : (
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
          );

        const lastUpdatedInfo = !updatedAt || !updatedBy
          ? null
          : (
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
          );

        return (
          <Fragment>
            <NewEntry
              FormComponent={FormComponent}
              gqlMutation={gqlMutation}
              initialValues={data}
              mutationName={mutationName}
              title={title}
              yupSchema={yupSchema}
            />
            {createdInfo}
            {lastUpdatedInfo}
          </Fragment>
        );
      }
    }
  </QueryWrap>
);

EditEntry.defaultProps = {
  mutationName: null,
};

EditEntry.propTypes = {
  FormComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  gqlMutation: PropTypes.oneOf(Object.values(mutations)).isRequired,
  gqlQuery: PropTypes.oneOf(Object.values(queries)).isRequired,
  id: PropTypes.number.isRequired,
  mutationName: PropTypes.string,
  queryName: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  yupSchema: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default EditEntry;
