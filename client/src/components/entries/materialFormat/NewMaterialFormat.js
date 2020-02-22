import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../AuthContext';

import NewEntry from '../NewEntry';

import MaterialFormatForm from './MaterialFormatForm';
import { CREATE_MATERIAL_FORMAT } from '../../../mutations';
import { materialFormatValidationSchema } from '../../../validationSchemas';

const NewMaterialFormat = ({ successCallback }) => {
  const { admin } = useContext(AuthContext);

  if (!admin) {
    return (
      <div className="status-message error persist">
        Sorry! Only administrators can create material formats.
      </div>
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
