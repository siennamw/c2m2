import React from 'react';

import NewEntry from '../NewEntry';

import CollectionForm from './CollectionForm';
import { CREATE_COLLECTION } from '../../../mutations';
import { collectionValidationSchema } from '../../../validationSchemas';

const NewCollection = () => (
  <NewEntry
    clearAfterSubmit
    FormComponent={CollectionForm}
    gqlMutation={CREATE_COLLECTION}
    title="New Collection"
    yupSchema={collectionValidationSchema}
  />
);

export default NewCollection;
