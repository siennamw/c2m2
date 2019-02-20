import React from 'react';

import NewEntry from '../NewEntry';

import RepositoryForm from './RepositoryForm';
import { CREATE_REPOSITORY } from '../../../mutations';
import { repositoryValidationSchema } from '../../../validationSchemas';

const NewRepository = () => (
  <NewEntry
    title="New Repository"
    gqlMutation={CREATE_REPOSITORY}
    yupSchema={repositoryValidationSchema}
    FormComponent={RepositoryForm}
  />
);

export default NewRepository;
