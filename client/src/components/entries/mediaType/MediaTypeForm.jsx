import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import {
  CREATE_MEDIA_TYPE,
  DELETE_MEDIA_TYPE,
  UPDATE_MEDIA_TYPE
} from '../../../mutations';
import { MEDIA_TYPE_BY_ID } from '../../../queries';
import {
  addIdToSchema,
  getInitialFormValuesForSchema,
  mediaTypeValidationSchema
} from '../../../validationSchemas';

import EntryFormButtons, { DeleteButton } from '../EntryFormButtons';
import EntryFormWrapper from '../EntryFormWrapper';
import QueryWrap from '../QueryWrap';
import MediaTypeFormFields from './MediaTypeFormFields';
import StatusMessage from '../../StatusMessage';

import { AuthContext } from '../../AuthContext';

const MediaTypeForm = ({ match, successCallback }) => {
  const id = match && match.params && match.params.id
    ? match.params.id
    : null;

  const { admin } = useContext(AuthContext);

  const [createMutation] = useMutation(CREATE_MEDIA_TYPE);
  const [updateMutation] = useMutation(UPDATE_MEDIA_TYPE);
  const [deleteMutation] = useMutation(DELETE_MEDIA_TYPE, {
    update(cache) {
      const normalizedId = cache.identify({ id, __typename: 'MediaType' });
      cache.evict({ id: normalizedId });
      cache.gc();
    }
  });

  if (!admin) {
    return (
      <StatusMessage
        message="Sorry! Only administrators can create and edit media types."
        type="error"
      />
    );
  }
  const schema = id
    ? addIdToSchema(mediaTypeValidationSchema)
    : mediaTypeValidationSchema;

  if (id) {
    // updating
    return (
      <QueryWrap
        id={id}
        query={MEDIA_TYPE_BY_ID}
        queryName="media_type"
      >
        {
          (data) => {
            return (
              <EntryFormWrapper
                initialValues={getInitialFormValuesForSchema(schema, data)}
                mutation={updateMutation}
                mutationName="updateMediaType"
                successCallback={successCallback}
                yupSchema={schema}
              >
                <h3>Edit Media Type</h3>
                <MediaTypeFormFields />
                <EntryFormButtons>
                  <DeleteButton
                    data={data}
                    deleteMutation={deleteMutation}
                    deleteMutationName="deleteMediaType"
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
      mutationName="createMediaType"
      successCallback={successCallback}
      yupSchema={schema}
    >
      <h3>New Media Type</h3>
      <MediaTypeFormFields />
      <EntryFormButtons />
    </EntryFormWrapper>
  );
};

MediaTypeForm.defaultProps = {
  successCallback: null,
};

MediaTypeForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  successCallback: PropTypes.func,
};

export default MediaTypeForm;
