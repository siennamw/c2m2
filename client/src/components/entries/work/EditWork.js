import React from 'react';
import PropTypes from 'prop-types';

import EditEntry from '../EditEntry';

import { UPDATE_WORK } from '../../../mutations';
import { WORK_BY_ID } from '../../../queries';
import { addIdToSchema, workValidationSchema } from '../../../validationSchemas';

import WorkForm from './WorkForm';

const EditWork = ({ match }) => {
  const id = Number(match.params.id);
  const schema = addIdToSchema(workValidationSchema);

  return (
    <EditEntry
      FormComponent={WorkForm}
      gqlQuery={WORK_BY_ID}
      gqlMutation={UPDATE_WORK}
      id={id}
      mutationName="updateWork"
      queryName="work"
      title="Edit Work"
      yupSchema={schema}
    />
  );
};

EditWork.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default EditWork;
