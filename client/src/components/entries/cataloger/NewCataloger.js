import React from 'react';
import { Query } from 'react-apollo';

import NewEntry from '../NewEntry';
import { SELF_IS_ADMIN } from '../../../queries';

import CatalogerForm from './CatalogerForm';
import { CREATE_CATALOGER } from '../../../mutations';
import { catalogerValidationSchema } from '../../../validationSchemas';

const NewCataloger = () => (
  <Query query={SELF_IS_ADMIN}>
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
      } else if (data && data.selfIsAdmin) {
        content = (
          <NewEntry
            FormComponent={CatalogerForm}
            gqlMutation={CREATE_CATALOGER}
            selfIsAdmin={data.selfIsAdmin}
            title="New Cataloger"
            yupSchema={catalogerValidationSchema}
          />
        );
      }

      return content;
    }}
  </Query>
);

export default NewCataloger;
