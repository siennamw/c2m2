import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import CatalogerForm from './CatalogerForm';
import NewEntry from '../NewEntry';
import StatusMessage from '../../StatusMessage';

import { CREATE_CATALOGER } from '../../../mutations';
import { catalogerValidationSchema } from '../../../validationSchemas';
import { AuthContext } from '../../AuthContext';

const NewCataloger = ({ successCallback }) => {
  const { admin } = useContext(AuthContext);

  if (!admin) {
    return (
      <StatusMessage
        message="Sorry! Only administrators can create new catalogers."
        type="error"
      />
    );
  }

  return (
    <NewEntry
      successCallback={successCallback}
      clearAfterSubmit
      FormComponent={CatalogerForm}
      gqlMutation={CREATE_CATALOGER}
      mutationName="createCataloger"
      title="New Cataloger"
      yupSchema={catalogerValidationSchema}
    />
  );
};

NewCataloger.defaultProps = {
  successCallback: null,
};

NewCataloger.propTypes = {
  successCallback: PropTypes.func,
};

export default NewCataloger;
