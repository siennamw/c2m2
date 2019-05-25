import React from 'react';

import NewEntry from '../NewEntry';

import DirectorForm from './DirectorForm';
import { CREATE_DIRECTOR } from '../../../mutations';
import { directorValidationSchema } from '../../../validationSchemas';

const NewDirector = () => (
  <NewEntry
    clearAfterSubmit
    FormComponent={DirectorForm}
    gqlMutation={CREATE_DIRECTOR}
    title="New Director"
    yupSchema={directorValidationSchema}
  />
);

export default NewDirector;
