import React from 'react';
import { Query } from 'react-apollo';

import { FIELD_TO_PLURAL } from '../../constants';
import NewEntry from './NewEntry';

const EditEntry = ({
  FormComponent, gqlMutation, gqlQuery, id, queryName, title, yupSchema
}) => (
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
          }
          return acc;
        }, {});

        content = (
          <NewEntry
            title={title}
            gqlMutation={gqlMutation}
            initialValues={initialValues}
            yupSchema={yupSchema}
            FormComponent={FormComponent}
          />
        );
      }

      return content;
    }}
  </Query>
);

export default EditEntry;
