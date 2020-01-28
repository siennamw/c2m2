import React from 'react';
import PropTypes from 'prop-types';

import NewEntry from '../NewEntry';

import MaterialFormatForm from './MaterialFormatForm';
import { CREATE_MATERIAL_FORMAT } from '../../../mutations';
import { materialFormatValidationSchema } from '../../../validationSchemas';

const NewMaterialFormat = ({ successCallback }) => (
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

NewMaterialFormat.defaultProps = {
  successCallback: null,
};

NewMaterialFormat.propTypes = {
  successCallback: PropTypes.func,
};

export default NewMaterialFormat;
