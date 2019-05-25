import React from 'react';

import NewEntry from '../NewEntry';

import MaterialFormatForm from './MaterialFormatForm';
import { CREATE_MATERIAL_FORMAT } from '../../../mutations';
import { materialFormatValidationSchema } from '../../../validationSchemas';

const NewMaterialFormat = () => (
  <NewEntry
    clearAfterSubmit
    FormComponent={MaterialFormatForm}
    gqlMutation={CREATE_MATERIAL_FORMAT}
    title="New Material Format"
    yupSchema={materialFormatValidationSchema}
  />
);

export default NewMaterialFormat;
