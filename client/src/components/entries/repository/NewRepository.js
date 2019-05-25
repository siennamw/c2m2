import React from 'react';

import NewEntry from '../NewEntry';

import RepositoryForm from './RepositoryForm';
import { CREATE_REPOSITORY } from '../../../mutations';
import { repositoryValidationSchema } from '../../../validationSchemas';

const NewRepository = () => (
  <NewEntry
    clearAfterSubmit
    FormComponent={RepositoryForm}
    gqlMutation={CREATE_REPOSITORY}
    title="New Repository"
    yupSchema={repositoryValidationSchema}
  />
);

export default NewRepository;
