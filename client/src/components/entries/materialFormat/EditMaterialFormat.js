import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { AuthContext } from '../../AuthContext';

import EditEntry from '../EditEntry';
import MaterialFormatForm from './MaterialFormatForm';
import StatusMessage from '../../StatusMessage';

import { UPDATE_MATERIAL_FORMAT } from '../../../mutations';
import { MATERIAL_FORMAT_BY_ID } from '../../../queries';
import { addIdToSchema, materialFormatValidationSchema } from '../../../validationSchemas';

const EditMaterialFormat = ({ match }) => {
  const { admin } = useContext(AuthContext);
  const id = Number(match.params.id);
  const schema = addIdToSchema(materialFormatValidationSchema);

  if (!admin) {
    return (
      <StatusMessage
        message="Sorry! Only administrators can edit material formats."
        type="error"
      />
    );
  }

  return (
    <EditEntry
      FormComponent={MaterialFormatForm}
      gqlQuery={MATERIAL_FORMAT_BY_ID}
      gqlMutation={UPDATE_MATERIAL_FORMAT}
      id={id}
      mutationName="updateMaterialFormat"
      queryName="material_format"
      title="Edit Material Format"
      yupSchema={schema}
    />
  );
};

EditMaterialFormat.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default EditMaterialFormat;
