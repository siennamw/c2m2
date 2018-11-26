import React from "react";

import NewEntry from '../../NewEntry';

import CollectionForm from './CollectionForm';
import { CREATE_COLLECTION } from "../../../mutations";
import { collectionValidationSchema } from '../../../validationSchemas';

const NewCollection = () => {
  return (
    <NewEntry
      title='New Collection'
      variablesList={Object.keys(collectionValidationSchema.fields)}
      gqlMutation={CREATE_COLLECTION}
      yupSchema={collectionValidationSchema}
      FormComponent={CollectionForm}
    />
  );
};

export default NewCollection;
