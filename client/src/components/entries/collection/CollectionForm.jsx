import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import {
  CREATE_COLLECTION,
  DELETE_COLLECTION,
  UPDATE_COLLECTION
} from '../../../mutations';
import { COLLECTION_BY_ID } from '../../../queries';
import {
  addIdToSchema,
  getInitialFormValuesForSchema,
  collectionValidationSchema
} from '../../../validationSchemas';

import EntryFormButtons, { DeleteButton } from '../EntryFormButtons';
import EntryFormWrapper from '../EntryFormWrapper';
import QueryWrap from '../QueryWrap';
import CollectionFormFields from './CollectionFormFields';

const CollectionForm = ({ match, successCallback }) => {
  const [createMutation] = useMutation(CREATE_COLLECTION);
  const [updateMutation] = useMutation(UPDATE_COLLECTION);
  const [deleteMutation] = useMutation(DELETE_COLLECTION);

  const id = match && match.params && match.params.id
    ? match.params.id
    : null;

  const schema = id
    ? addIdToSchema(collectionValidationSchema)
    : collectionValidationSchema;

  if (id) {
    // updating
    return (
      <QueryWrap
        id={id}
        query={COLLECTION_BY_ID}
        queryName="collection"
      >
        {
          (data) => {
            return (
              <EntryFormWrapper
                initialValues={getInitialFormValuesForSchema(schema, data)}
                mutation={updateMutation}
                mutationName="updateCollection"
                successCallback={successCallback}
                yupSchema={schema}
              >
                <h3>Edit Collection</h3>
                <CollectionFormFields />
                <EntryFormButtons>
                  <DeleteButton
                    data={data}
                    deleteMutation={deleteMutation}
                    deleteMutationName="toggleDeleteCollection"
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
      mutationName="createCollection"
      successCallback={successCallback}
      yupSchema={schema}
    >
      <h3>New Collection</h3>
      <CollectionFormFields />
      <EntryFormButtons />
    </EntryFormWrapper>
  );
};

CollectionForm.defaultProps = {
  successCallback: null,
};

CollectionForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  successCallback: PropTypes.func,
};

export default CollectionForm;
