import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import {
  CREATE_RESOURCE,
  DELETE_RESOURCE,
  UPDATE_RESOURCE
} from '../../../mutations';
import { RESOURCE_BY_ID } from '../../../queries';
import {
  addIdToSchema,
  getInitialFormValuesForSchema,
  resourceValidationSchema
} from '../../../validationSchemas';

import EntryFormButtons, { DeleteButton } from '../EntryFormButtons';
import EntryFormWrapper from '../EntryFormWrapper';
import QueryWrap from '../QueryWrap';
import ResourceFormFields from './ResourceFormFields';

const ResourceForm = ({ match, successCallback }) => {
  const [createMutation] = useMutation(CREATE_RESOURCE);
  const [updateMutation] = useMutation(UPDATE_RESOURCE);
  const [deleteMutation] = useMutation(DELETE_RESOURCE);

  const id = match && match.params && match.params.id
    ? Number(match.params.id)
    : null;

  const schema = id
    ? addIdToSchema(resourceValidationSchema)
    : resourceValidationSchema;

  if (id) {
    // updating
    return (
      <QueryWrap
        id={id}
        query={RESOURCE_BY_ID}
        queryName="resource"
      >
        {
          (data) => {
            return (
              <EntryFormWrapper
                initialValues={getInitialFormValuesForSchema(schema, data)}
                mutation={updateMutation}
                mutationName="updateResource"
                successCallback={successCallback}
                yupSchema={schema}
              >
                <h3>Edit Resource</h3>
                <ResourceFormFields />
                <EntryFormButtons>
                  <DeleteButton
                    data={data}
                    deleteMutation={deleteMutation}
                    deleteMutationName="toggleDeleteResource"
                    yupSchema={schema}
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
      mutationName="createResource"
      successCallback={successCallback}
      yupSchema={schema}
    >
      <h3>New Resource</h3>
      <ResourceFormFields />
      <EntryFormButtons />
    </EntryFormWrapper>
  );
};

ResourceForm.defaultProps = {
  successCallback: null,
};

ResourceForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  successCallback: PropTypes.func,
};

export default ResourceForm;
