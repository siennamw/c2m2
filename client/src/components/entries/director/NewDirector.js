import React from 'react';

import NewEntry from '../NewEntry';

import DirectorForm from './DirectorForm';
import { CREATE_DIRECTOR } from '../../../mutations';
import { directorValidationSchema } from '../../../validationSchemas';

const NewDirector = () => (
  <NewEntry
    title="New Director"
    gqlMutation={CREATE_DIRECTOR}
    yupSchema={directorValidationSchema}
    FormComponent={DirectorForm}
  />
);

export default NewDirector;
