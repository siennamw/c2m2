import React from 'react';

import NewEntry from '../NewEntry';

import ComposerForm from './ComposerForm';
import { CREATE_COMPOSER } from '../../../mutations';
import { composerValidationSchema } from '../../../validationSchemas';

const NewComposer = () => (
  <NewEntry
    clearAfterSubmit
    FormComponent={ComposerForm}
    gqlMutation={CREATE_COMPOSER}
    title="New Composer or Orchestrator"
    yupSchema={composerValidationSchema}
  />
);

export default NewComposer;
