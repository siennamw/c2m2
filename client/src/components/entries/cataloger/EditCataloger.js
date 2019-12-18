import React from 'react';

import EditEntry from '../EditEntry';

import { UPDATE_CATALOGER_ADMIN } from '../../../mutations';
import { CATALOGER_BY_ID_LEAN } from '../../../queries';
import { addIdToSchema, catalogerValidationSchema } from '../../../validationSchemas';

import { CatalogerFormNoPasswords } from './CatalogerForm';

const EditCataloger = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(catalogerValidationSchema);

  return (
    <EditEntry
      FormComponent={CatalogerFormNoPasswords}
      gqlQuery={CATALOGER_BY_ID_LEAN}
      gqlMutation={UPDATE_CATALOGER_ADMIN}
      id={id}
      mutationName="updateCatalogerAdmin"
      queryName="cataloger"
      title="Edit Cataloger"
      yupSchema={schema}
    />
  );
};

export default EditCataloger;
