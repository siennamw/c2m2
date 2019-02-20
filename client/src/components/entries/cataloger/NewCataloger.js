import React from 'react';

import NewEntry from '../NewEntry';

import CatalogerForm from './CatalogerForm';
import { CREATE_CATALOGER } from '../../../mutations';
import { catalogerValidationSchema } from '../../../validationSchemas';

const NewCataloger = () => (
  <NewEntry
    title="New Cataloger"
    gqlMutation={CREATE_CATALOGER}
    yupSchema={catalogerValidationSchema}
    FormComponent={CatalogerForm}
  />
);

export default NewCataloger;
