import React from 'react';
import PropTypes from 'prop-types';

import NewEntry from '../NewEntry';

import ResourceForm from './ResourceForm';
import { CREATE_RESOURCE } from '../../../mutations';
import { resourceValidationSchema } from '../../../validationSchemas';

const NewResource = ({ successCallback }) => (
  <NewEntry
    successCallback={successCallback}
    clearAfterSubmit
    title="New Resource"
    gqlMutation={CREATE_RESOURCE}
    mutationName="createResource"
    yupSchema={resourceValidationSchema}
    FormComponent={ResourceForm}
  />
);

NewResource.defaultProps = {
  successCallback: null,
};

NewResource.propTypes = {
  successCallback: PropTypes.func,
};

export default NewResource;
