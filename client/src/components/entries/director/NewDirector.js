import React from 'react';
import PropTypes from 'prop-types';

import NewEntry from '../NewEntry';

import DirectorForm from './DirectorForm';
import { CREATE_DIRECTOR } from '../../../mutations';
import { directorValidationSchema } from '../../../validationSchemas';

const NewDirector = ({ successCallback }) => (
  <NewEntry
    successCallback={successCallback}
    clearAfterSubmit
    FormComponent={DirectorForm}
    gqlMutation={CREATE_DIRECTOR}
    mutationName="createDirector"
    title="New Director"
    yupSchema={directorValidationSchema}
  />
);

NewDirector.defaultProps = {
  successCallback: null,
};

NewDirector.propTypes = {
  successCallback: PropTypes.func,
};

export default NewDirector;
