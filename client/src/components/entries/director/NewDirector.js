import React from "react";

import NewEntry from '../NewEntry';

import DirectorForm from './DirectorForm';
import { CREATE_DIRECTOR } from "../../../mutations";
import { directorValidationSchema } from '../../../validationSchemas';

const NewDirector = () => {
  return (
    <NewEntry
      title='New Director'
      variablesList={Object.keys(directorValidationSchema.fields)}
      gqlMutation={CREATE_DIRECTOR}
      yupSchema={directorValidationSchema}
      FormComponent={DirectorForm}
    />
  );
};

export default NewDirector;
