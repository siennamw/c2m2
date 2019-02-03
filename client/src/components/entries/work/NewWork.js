import React from "react";

import NewEntry from '../NewEntry';

import WorkForm from './WorkForm';
import { CREATE_WORK } from "../../../mutations";
import { workValidationSchema } from '../../../validationSchemas';

const NewWork = () => {
  return (
    <NewEntry
      title='New Work'
      variablesList={Object.keys(workValidationSchema.fields)}
      gqlMutation={CREATE_WORK}
      yupSchema={workValidationSchema}
      FormComponent={WorkForm}
    />
  );
};

export default NewWork;
