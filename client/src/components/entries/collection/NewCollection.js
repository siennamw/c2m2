import React from 'react';
import PropTypes from 'prop-types';

import NewEntry from '../NewEntry';

import CollectionForm from './CollectionForm';
import { CREATE_COLLECTION } from '../../../mutations';
import { collectionValidationSchema } from '../../../validationSchemas';

const NewCollection = ({ successCallback }) => (
  <NewEntry
    successCallback={successCallback}
    clearAfterSubmit
    FormComponent={CollectionForm}
    gqlMutation={CREATE_COLLECTION}
    mutationName="createCollection"
    title="New Collection"
    yupSchema={collectionValidationSchema}
  />
);

NewCollection.defaultProps = {
  successCallback: null,
};

NewCollection.propTypes = {
  successCallback: PropTypes.func,
};

export default NewCollection;
