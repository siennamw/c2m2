import React from 'react';
import PropTypes from 'prop-types';

import NewEntry from '../NewEntry';

import WorkForm from './WorkForm';
import { CREATE_WORK } from '../../../mutations';
import { workValidationSchema } from '../../../validationSchemas';

const NewWork = ({ successCallback }) => (
  <NewEntry
    successCallback={successCallback}
    clearAfterSubmit
    title="New Work"
    gqlMutation={CREATE_WORK}
    mutationName="createWork"
    yupSchema={workValidationSchema}
    FormComponent={WorkForm}
  />
);

NewWork.defaultProps = {
  successCallback: null,
};

NewWork.propTypes = {
  successCallback: PropTypes.func,
};

export default NewWork;
