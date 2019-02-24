import React from 'react';

import EditEntry from '../EditEntry';

import { UPDATE_MATERIAL_FORMAT } from '../../../mutations';
import { MATERIAL_FORMAT_BY_ID } from '../../../queries';
import { addIdToSchema, materialFormatValidationSchema } from '../../../validationSchemas';

import MaterialFormatForm from './MaterialFormatForm';

const EditMaterialFormat = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(materialFormatValidationSchema);

  return (
    <EditEntry
      FormComponent={MaterialFormatForm}
      gqlQuery={MATERIAL_FORMAT_BY_ID}
      gqlMutation={UPDATE_MATERIAL_FORMAT}
      id={id}
      queryName="material_format"
      title="Edit Material Format"
      yupSchema={schema}
    />
  );
};

export default EditMaterialFormat;
