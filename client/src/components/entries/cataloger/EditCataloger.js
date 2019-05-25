import React from 'react';

import EditEntry from '../EditEntry';

import { UPDATE_CATALOGER } from '../../../mutations';
import { CATALOGER_BY_ID_LEAN } from '../../../queries';
import { addIdToSchema, catalogerValidationSchema } from '../../../validationSchemas';

import CatalogerForm from './CatalogerForm';

const EditCataloger = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(catalogerValidationSchema);

  return (
    <EditEntry
      FormComponent={CatalogerForm}
      gqlQuery={CATALOGER_BY_ID_LEAN}
      gqlMutation={UPDATE_CATALOGER}
      id={id}
      mutationName="updateCataloger"
      queryName="cataloger"
      title="Edit Cataloger"
      yupSchema={schema}
    />
  );
};

export default EditCataloger;
