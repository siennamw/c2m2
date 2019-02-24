import React from 'react';

import EditEntry from '../EditEntry';

import { UPDATE_PUBLISHER } from '../../../mutations';
import { PUBLISHER_BY_ID } from '../../../queries';
import { addIdToSchema, publisherValidationSchema } from '../../../validationSchemas';

import PublisherForm from './PublisherForm';

const EditPublisher = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(publisherValidationSchema);

  return (
    <EditEntry
      FormComponent={PublisherForm}
      gqlQuery={PUBLISHER_BY_ID}
      gqlMutation={UPDATE_PUBLISHER}
      id={id}
      queryName="publisher"
      title="Edit Publisher"
      yupSchema={schema}
    />
  );
};

export default EditPublisher;
