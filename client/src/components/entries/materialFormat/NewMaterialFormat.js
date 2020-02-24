import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../AuthContext';

import MaterialFormatForm from './MaterialFormatForm';
import NewEntry from '../NewEntry';
import StatusMessage from '../../StatusMessage';

import { CREATE_MATERIAL_FORMAT } from '../../../mutations';
import { materialFormatValidationSchema } from '../../../validationSchemas';

const NewMaterialFormat = ({ successCallback }) => {
  const { admin } = useContext(AuthContext);

  if (!admin) {
    return (
      <StatusMessage
        message="Sorry! Only administrators can create material formats."
        type="error"
      />
    );
  }

  return (
    <NewEntry
      successCallback={successCallback}
      clearAfterSubmit
      FormComponent={MaterialFormatForm}
      gqlMutation={CREATE_MATERIAL_FORMAT}
      mutationName="createMaterialFormat"
      title="New Material Format"
      yupSchema={materialFormatValidationSchema}
    />
  );
};

NewMaterialFormat.defaultProps = {
  successCallback: null,
};

NewMaterialFormat.propTypes = {
  successCallback: PropTypes.func,
};

export default NewMaterialFormat;
