import React from "react";

import NewEntry from '../../NewEntry';

import MaterialFormatForm from './MaterialFormatForm';
import { CREATE_MATERIAL_FORMAT } from '../../../mutations';
import { materialFormatValidationSchema } from '../../../validationSchemas';

const NewMaterialFormat = () => {
  return (
    <NewEntry
      title='New Material Format'
      variablesList={Object.keys(materialFormatValidationSchema.fields)}
      gqlMutation={CREATE_MATERIAL_FORMAT}
      yupSchema={materialFormatValidationSchema}
      FormComponent={MaterialFormatForm}
    />
  );
};

export default NewMaterialFormat;
