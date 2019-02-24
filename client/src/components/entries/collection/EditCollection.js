import React from 'react';

import EditEntry from '../EditEntry';

import { UPDATE_COLLECTION } from '../../../mutations';
import { COLLECTION_BY_ID } from '../../../queries';
import { addIdToSchema, collectionValidationSchema } from '../../../validationSchemas';

import CollectionForm from './CollectionForm';

const EditCollection = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(collectionValidationSchema);

  return (
    <EditEntry
      FormComponent={CollectionForm}
      gqlQuery={COLLECTION_BY_ID}
      gqlMutation={UPDATE_COLLECTION}
      id={id}
      queryName="collection"
      title="Edit Collection"
      yupSchema={schema}
    />
  );
};

export default EditCollection;
