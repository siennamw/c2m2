import React from 'react';
import { Query } from 'react-apollo';

import NewEntry from '../NewEntry';

import CatalogerForm from './CatalogerForm';
import { SELF_IS_ADMIN } from '../../../queries';
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
      } else if (data) {
        if (data.selfIsAdmin) {
          content = (
            <NewEntry
              clearAfterSubmit
              FormComponent={CatalogerForm}
              gqlMutation={CREATE_CATALOGER}
              selfIsAdmin={data.selfIsAdmin}
              title="New Cataloger"
              yupSchema={catalogerValidationSchema}
            />
          );
        } else {
          content = (
            <div className="status-message error">
              Sorry! Only administrators can create new catalogers.
            </div>
          );
        }
      }

      return content;
    }}
  </Query>
);

export default NewCataloger;
