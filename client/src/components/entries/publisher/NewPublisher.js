import React from 'react';

import NewEntry from '../NewEntry';

import PublisherForm from './PublisherForm';
import { CREATE_PUBLISHER } from '../../../mutations';
import { publisherValidationSchema } from '../../../validationSchemas';

const NewPublisher = () => (
  <NewEntry
    clearAfterSubmit
    FormComponent={PublisherForm}
    gqlMutation={CREATE_PUBLISHER}
    title="New Publisher"
    yupSchema={publisherValidationSchema}
  />
);

export default NewPublisher;
