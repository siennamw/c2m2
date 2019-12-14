import React, { useContext } from 'react';

import NewEntry from '../NewEntry';

import CatalogerForm from './CatalogerForm';
import { CREATE_CATALOGER } from '../../../mutations';
import { catalogerValidationSchema } from '../../../validationSchemas';
import { AuthContext } from '../../App';

const NewCataloger = () => {
  const { admin } = useContext(AuthContext);

  if (admin) {
    return (
      <NewEntry
        clearAfterSubmit
        FormComponent={CatalogerForm}
        gqlMutation={CREATE_CATALOGER}
        title="New Cataloger"
        yupSchema={catalogerValidationSchema}
      />
    );
  }

  return (
    <div className="status-message error">
      Sorry! Only administrators can create new catalogers.
    </div>
  );
};

export default NewCataloger;
