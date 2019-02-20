import React from 'react';

import NewEntry from '../NewEntry';

import PublisherForm from './PublisherForm';
import { CREATE_PUBLISHER } from '../../../mutations';
import { publisherValidationSchema } from '../../../validationSchemas';

const NewPublisher = () => (
  <NewEntry
    title="New Publisher"
    gqlMutation={CREATE_PUBLISHER}
    yupSchema={publisherValidationSchema}
    FormComponent={PublisherForm}
  />
);

export default NewPublisher;
