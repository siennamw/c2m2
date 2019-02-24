import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';

import { FIELD_TO_PLURAL } from '../../constants';
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
    {({ error, data, refetch }) => {
      let content = (
        <div className="status-message warn">Fetching...</div>
      );

      if (error) {
        content = (
          <div className="status-message error">
            Sorry! There was an error fetching data.
          </div>
        );
      } else if (data && data[queryName]) {
        let k;

        const initialValues = Object.keys(yupSchema.fields).reduce((acc, key) => {
          // extract values and ids from data
          if (data[queryName][key]) {
            acc[key] = data[queryName][key];
          } else if (key.includes('_ids')) {
            // extract array of ids from array of objects
            k = key.split('_ids')[0];
            k = FIELD_TO_PLURAL[k] ? FIELD_TO_PLURAL[k] : `${k}s`;

            acc[key] = data[queryName][k].reduce((a, i) => {
              a.push(Number(i.id));
              return a;
            }, []);
          } else if (key.includes('_id')) {
            // extract id from object
            k = key.split('_id')[0];
            acc[key] = data[queryName][k] && data[queryName][k].id
              ? Number(data[queryName][k].id)
              : undefined;
          } else {
            // allows field to be controlled without populating it
            // with a value from the DB (ex. password)
            acc[key] = '';
          }
          return acc;
        }, {});

        content = (
          <NewEntry
            FormComponent={FormComponent}
            gqlMutation={gqlMutation}
            initialValues={initialValues}
            refetch={refetch}
            title={title}
            yupSchema={yupSchema}
          />
        );
      }

      return content;
    }}
  </Query>
);

export default EditEntry;
