import React from 'react';

import NewEntry from '../NewEntry';

import WorkForm from './WorkForm';
import { CREATE_WORK } from '../../../mutations';
import { workValidationSchema } from '../../../validationSchemas';

const NewWork = () => (
  <NewEntry
    clearAfterSubmit
    title="New Work"
    gqlMutation={CREATE_WORK}
    yupSchema={workValidationSchema}
    FormComponent={WorkForm}
  />
);

export default NewWork;
