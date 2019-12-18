import React, { useContext } from 'react';

import EditEntry from '../entries/EditEntry';

import { UPDATE_CATALOGER_SELF } from '../../mutations';
import { CATALOGER_BY_ID_LEAN } from '../../queries';
import {
  addIdToSchema,
  addPasswordsToSchema,
  catalogerValidationSchema,
} from '../../validationSchemas';

import CatalogerForm from '../entries/cataloger/CatalogerForm';
import { AuthContext } from '../AuthContext';

const CatalogerEditAccount = () => {
  const { id } = useContext(AuthContext);
  const schema = addPasswordsToSchema(addIdToSchema(catalogerValidationSchema));

  return (
    <EditEntry
      FormComponent={CatalogerForm}
      gqlQuery={CATALOGER_BY_ID_LEAN}
      gqlMutation={UPDATE_CATALOGER_SELF}
      id={id}
      mutationName="updateCatalogerSelf"
      queryName="cataloger"
      title="Update Account"
      yupSchema={schema}
    />
  );
};

export default CatalogerEditAccount;
