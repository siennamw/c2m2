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

        // extract ids from objects to populate form fields
        let k;
        const groomedData = Object.keys(yupSchema.fields).reduce((acc, key) => {
          if (key.includes('_ids')) {
            // extract array of ids from array of objects
            k = key.split('_ids')[0];
            k = FIELD_TO_PLURAL[k] ? FIELD_TO_PLURAL[k] : `${k}s`;

            acc[key] = data[queryName][k].reduce((a, i) => {
              a.push(i.id);
              return a;
            }, []);
          } else if (key.includes('_id')) {
            // extract id from object
            k = key.split('_id')[0];
            acc[key] = data[queryName][k] && data[queryName][k].id
              ? data[queryName][k].id
              : undefined;
          } else {
            acc[key] = data[queryName][key] || '';
          }
          return acc;
        }, {});

        const initialValues = yupSchema.cast(groomedData);

        content = (
          <NewEntry
            FormComponent={FormComponent}
            entryIsSelf={entryIsSelf}
            gqlMutation={gqlMutation}
            initialValues={initialValues}
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
