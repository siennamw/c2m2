import React from 'react';
import PropTypes from 'prop-types';

import NewEntry from '../NewEntry';

import WorkForm from './WorkForm';
import { CREATE_WORK } from '../../../mutations';
import { workValidationSchema } from '../../../validationSchemas';

const NewWork = ({ initialValues, title }) => (
  <NewEntry
    clearAfterSubmit
    title="New Work"
    gqlMutation={CREATE_WORK}
    initialValues={initialValues}
    yupSchema={workValidationSchema}
    FormComponent={WorkForm}
  />
);

NewWork.defaultProps = {
  initialValues: null,
  title: 'New Work',
};

NewWork.propTypes = {
  initialValues: (props, propName, componentName) => {
    workValidationSchema
      .isValid(props[propName])
      .then((valid) => {
        if (!valid) {
          return new Error(`Invalid prop ${propName} supplied to ${componentName}.`);
        }
        return true;
      });
  },
  title: PropTypes.string,
};

export default NewWork;
