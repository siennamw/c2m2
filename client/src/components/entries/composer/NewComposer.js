import React from "react";

import NewEntry from '../NewEntry';

import ComposerForm from './ComposerForm';
import { CREATE_COMPOSER } from "../../../mutations";
import { composerValidationSchema } from '../../../validationSchemas';

const NewComposer = () => {
  return (
    <NewEntry
      title='New Composer'
      variablesList={Object.keys(composerValidationSchema.fields)}
      gqlMutation={CREATE_COMPOSER}
      yupSchema={composerValidationSchema}
      FormComponent={ComposerForm}
    />
  );
};

export default NewComposer;
