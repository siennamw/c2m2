import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

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
  const id = match && match.params && match.params.id
    ? match.params.id
    : null;

  const [createMutation] = useMutation(CREATE_RESOURCE);
  const [updateMutation] = useMutation(UPDATE_RESOURCE);
  const [deleteMutation] = useMutation(DELETE_RESOURCE, {
    update(cache) {
      const normalizedId = cache.identify({ id, __typename: 'Resource' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

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
                    deleteMutationName="deleteResource"
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
