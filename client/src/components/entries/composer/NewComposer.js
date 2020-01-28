import React from 'react';
import PropTypes from 'prop-types';

import NewEntry from '../NewEntry';

import ComposerForm from './ComposerForm';
import { CREATE_COMPOSER } from '../../../mutations';
import { composerValidationSchema } from '../../../validationSchemas';

const NewComposer = ({ successCallback }) => (
  <NewEntry
    successCallback={successCallback}
    clearAfterSubmit
    FormComponent={ComposerForm}
    gqlMutation={CREATE_COMPOSER}
    mutationName="createComposer"
    title="New Composer or Orchestrator"
    yupSchema={composerValidationSchema}
  />
);

NewComposer.defaultProps = {
  successCallback: null,
};

NewComposer.propTypes = {
  successCallback: PropTypes.func,
};

export default NewComposer;
