import React from 'react';
import PropTypes from 'prop-types';

import NewEntry from '../NewEntry';

import RepositoryForm from './RepositoryForm';
import { CREATE_REPOSITORY } from '../../../mutations';
import { repositoryValidationSchema } from '../../../validationSchemas';

const NewRepository = ({ successCallback }) => (
  <NewEntry
    successCallback={successCallback}
    clearAfterSubmit
    FormComponent={RepositoryForm}
    gqlMutation={CREATE_REPOSITORY}
    mutationName="createRepository"
    title="New Repository"
    yupSchema={repositoryValidationSchema}
  />
);

NewRepository.defaultProps = {
  successCallback: null,
};

NewRepository.propTypes = {
  successCallback: PropTypes.func,
};

export default NewRepository;
