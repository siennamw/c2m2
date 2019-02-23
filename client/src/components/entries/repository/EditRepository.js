import React from 'react';

import EditEntry from '../EditEntry';

import { UPDATE_REPOSITORY } from '../../../mutations';
import { REPOSITORY_BY_ID } from '../../../queries';
import { addIdToSchema, repositoryValidationSchema } from '../../../validationSchemas';

import RepositoryForm from './RepositoryForm';

const EditRepository = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(repositoryValidationSchema);

  return (
    <EditEntry
      FormComponent={RepositoryForm}
      gqlQuery={REPOSITORY_BY_ID}
      gqlMutation={UPDATE_REPOSITORY}
      id={id}
      queryName="repository"
      title="Edit Repository"
      yupSchema={schema}
    />
  );
};

export default EditRepository;
