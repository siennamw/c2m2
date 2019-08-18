import React from 'react';

import NewEntry from '../NewEntry';

import ResourceForm from './ResourceForm';
import { CREATE_RESOURCE } from '../../../mutations';
import { resourceValidationSchema } from '../../../validationSchemas';

const NewResource = () => (
  <NewEntry
    clearAfterSubmit
    title="New Resource"
    gqlMutation={CREATE_RESOURCE}
    yupSchema={resourceValidationSchema}
    FormComponent={ResourceForm}
  />
);

export default NewResource;
