import React from 'react';

import EditEntry from '../EditEntry';

import { UPDATE_DIRECTOR } from '../../../mutations';
import { DIRECTOR_BY_ID } from '../../../queries';
import { addIdToSchema, directorValidationSchema } from '../../../validationSchemas';

import DirectorForm from './DirectorForm';

const EditDirector = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(directorValidationSchema);

  return (
    <EditEntry
      FormComponent={DirectorForm}
      gqlQuery={DIRECTOR_BY_ID}
      gqlMutation={UPDATE_DIRECTOR}
      id={id}
      queryName="director"
      title="Edit Director"
      yupSchema={schema}
    />
  );
};

export default EditDirector;
