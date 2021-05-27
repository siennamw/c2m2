import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import {
  CREATE_WORK,
  DELETE_WORK,
  UPDATE_WORK
} from '../../../mutations';
import { WORK_BY_ID } from '../../../queries';
import {
  addIdToSchema,
  getInitialFormValuesForSchema,
  workValidationSchema
} from '../../../validationSchemas';

import EntryFormButtons, { DeleteButton } from '../EntryFormButtons';
import EntryFormWrapper from '../EntryFormWrapper';
import QueryWrap from '../QueryWrap';
import WorkFormFields from './WorkFormFields';

const WorkForm = ({ match, successCallback }) => {
  const id = match && match.params && match.params.id
    ? match.params.id
    : null;

  const [createMutation] = useMutation(CREATE_WORK);
  const [updateMutation] = useMutation(UPDATE_WORK);
  const [deleteMutation] = useMutation(DELETE_WORK, {
    update(cache) {
      const normalizedId = cache.identify({ id, __typename: 'Work' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  const schema = id
    ? addIdToSchema(workValidationSchema)
    : workValidationSchema;

  if (id) {
    // updating
    return (
      <QueryWrap
        id={id}
        query={WORK_BY_ID}
        queryName="work"
      >
        {
          (data) => {
            return (
              <EntryFormWrapper
                initialValues={getInitialFormValuesForSchema(schema, data)}
                mutation={updateMutation}
                mutationName="updateWork"
                successCallback={successCallback}
                yupSchema={schema}
              >
                <h3>Edit Work</h3>
                <WorkFormFields />
                <EntryFormButtons>
                  <DeleteButton
                    data={data}
                    deleteMutation={deleteMutation}
                    deleteMutationName="deleteWork"
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
      mutationName="createWork"
      successCallback={successCallback}
      yupSchema={schema}
    >
      <h3>New Work</h3>
      <WorkFormFields />
      <EntryFormButtons />
    </EntryFormWrapper>
  );
};

WorkForm.defaultProps = {
  successCallback: null,
};

WorkForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  successCallback: PropTypes.func,
};

export default WorkForm;
