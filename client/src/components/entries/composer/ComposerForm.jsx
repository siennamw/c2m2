import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import { CREATE_COMPOSER, DELETE_COMPOSER, UPDATE_COMPOSER } from '../../../mutations';
import { COMPOSER_BY_ID } from '../../../queries';
import {
  addIdToSchema,
  getInitialFormValuesForSchema,
  composerValidationSchema
} from '../../../validationSchemas';

import EntryFormButtons, { DeleteButton } from '../EntryFormButtons';
import EntryFormWrapper from '../EntryFormWrapper';
import QueryWrap from '../QueryWrap';
import ComposerFormFields from './ComposerFormFields';

const ComposerForm = ({ match, successCallback }) => {
  const [createMutation] = useMutation(CREATE_COMPOSER);
  const [updateMutation] = useMutation(UPDATE_COMPOSER);
  const [deleteMutation] = useMutation(DELETE_COMPOSER);

  const id = match && match.params && match.params.id
    ? match.params.id
    : null;

  const schema = id
    ? addIdToSchema(composerValidationSchema)
    : composerValidationSchema;

  if (id) {
    // updating
    return (
      <QueryWrap
        id={id}
        query={COMPOSER_BY_ID}
        queryName="composer"
      >
        {
          (data) => {
            return (
              <EntryFormWrapper
                initialValues={getInitialFormValuesForSchema(schema, data)}
                mutation={updateMutation}
                mutationName="updateComposer"
                successCallback={successCallback}
                yupSchema={schema}
              >
                <h3>Edit Composer/Orchestrator</h3>
                <ComposerFormFields />
                <EntryFormButtons>
                  <DeleteButton
                    data={data}
                    deleteMutation={deleteMutation}
                    deleteMutationName="deleteComposer"
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
      mutationName="createComposer"
      successCallback={successCallback}
      yupSchema={schema}
    >
      <h3>New Composer/Orchestrator</h3>
      <ComposerFormFields />
      <EntryFormButtons />
    </EntryFormWrapper>
  );
};

ComposerForm.defaultProps = {
  successCallback: null,
};

ComposerForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  successCallback: PropTypes.func,
};

export default ComposerForm;
