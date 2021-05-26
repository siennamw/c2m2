import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import {
  CREATE_REPOSITORY,
  DELETE_REPOSITORY,
  UPDATE_REPOSITORY
} from '../../../mutations';
import { REPOSITORY_BY_ID } from '../../../queries';
import {
  addIdToSchema,
  getInitialFormValuesForSchema,
  repositoryValidationSchema
} from '../../../validationSchemas';

import EntryFormButtons, { DeleteButton } from '../EntryFormButtons';
import EntryFormWrapper from '../EntryFormWrapper';
import QueryWrap from '../QueryWrap';
import RepositoryFormFields from './RepositoryFormFields';

const RepositoryForm = ({ match, successCallback }) => {
  const [createMutation] = useMutation(CREATE_REPOSITORY);
  const [updateMutation] = useMutation(UPDATE_REPOSITORY);
  const [deleteMutation] = useMutation(DELETE_REPOSITORY);

  const id = match && match.params && match.params.id
    ? match.params.id
    : null;

  const schema = id
    ? addIdToSchema(repositoryValidationSchema)
    : repositoryValidationSchema;

  if (id) {
    // updating
    return (
      <QueryWrap
        id={id}
        query={REPOSITORY_BY_ID}
        queryName="repository"
      >
        {
          (data) => {
            return (
              <EntryFormWrapper
                initialValues={getInitialFormValuesForSchema(schema, data)}
                mutation={updateMutation}
                mutationName="updateRepository"
                successCallback={successCallback}
                yupSchema={schema}
              >
                <h3>Edit Repository</h3>
                <RepositoryFormFields />
                <EntryFormButtons>
                  <DeleteButton
                    data={data}
                    deleteMutation={deleteMutation}
                    deleteMutationName="toggleDeleteRepository"
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
      mutationName="createRepository"
      successCallback={successCallback}
      yupSchema={schema}
    >
      <h3>New Repository</h3>
      <RepositoryFormFields />
      <EntryFormButtons />
    </EntryFormWrapper>
  );
};

RepositoryForm.defaultProps = {
  successCallback: null,
};

RepositoryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  successCallback: PropTypes.func,
};

export default RepositoryForm;
