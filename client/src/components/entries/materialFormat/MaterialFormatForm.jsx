import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import {
  CREATE_MATERIAL_FORMAT,
  DELETE_MATERIAL_FORMAT,
  UPDATE_MATERIAL_FORMAT
} from '../../../mutations';
import { MATERIAL_FORMAT_BY_ID } from '../../../queries';
import {
  addIdToSchema,
  getInitialFormValuesForSchema,
  materialFormatValidationSchema
} from '../../../validationSchemas';

import EntryFormButtons, { DeleteButton } from '../EntryFormButtons';
import EntryFormWrapper from '../EntryFormWrapper';
import QueryWrap from '../QueryWrap';
import MaterialFormatFormFields from './MaterialFormatFormFields';
import StatusMessage from '../../StatusMessage';

import { AuthContext } from '../../AuthContext';

const MaterialFormatForm = ({ match, successCallback }) => {
  const { admin } = useContext(AuthContext);
  const [createMutation] = useMutation(CREATE_MATERIAL_FORMAT);
  const [updateMutation] = useMutation(UPDATE_MATERIAL_FORMAT);
  const [deleteMutation] = useMutation(DELETE_MATERIAL_FORMAT);

  if (!admin) {
    return (
      <StatusMessage
        message="Sorry! Only administrators can create and edit material formats."
        type="error"
      />
    );
  }

  const id = match && match.params && match.params.id
    ? match.params.id
    : null;

  const schema = id
    ? addIdToSchema(materialFormatValidationSchema)
    : materialFormatValidationSchema;

  if (id) {
    // updating
    return (
      <QueryWrap
        id={id}
        query={MATERIAL_FORMAT_BY_ID}
        queryName="material_format"
      >
        {
          (data) => {
            return (
              <EntryFormWrapper
                initialValues={getInitialFormValuesForSchema(schema, data)}
                mutation={updateMutation}
                mutationName="updateMaterialFormat"
                successCallback={successCallback}
                yupSchema={schema}
              >
                <h3>Edit Material Format</h3>
                <MaterialFormatFormFields />
                <EntryFormButtons>
                  <DeleteButton
                    data={data}
                    deleteMutation={deleteMutation}
                    deleteMutationName="deleteMaterialFormat"
                  />
                </EntryFormButtons>
              </EntryFormWrapper>
            );
          }
        }
      </QueryWrap>
    );
  }

  // creating
  return (
    <EntryFormWrapper
      clearAfterSubmit
      initialValues={getInitialFormValuesForSchema(schema)}
      mutation={createMutation}
      mutationName="createMaterialFormat"
      successCallback={successCallback}
      yupSchema={schema}
    >
      <h3>New Material Format</h3>
      <MaterialFormatFormFields />
      <EntryFormButtons />
    </EntryFormWrapper>
  );
};

MaterialFormatForm.defaultProps = {
  successCallback: null,
};

MaterialFormatForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  successCallback: PropTypes.func,
};

export default MaterialFormatForm;
