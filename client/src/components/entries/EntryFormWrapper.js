import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form } from 'formik';

const EntryFormWrapper = ({
  entryIsSelf,
  FormComponent,
  handleSubmit,
  initialValues,
  mutation,
  selfIsAdmin,
  validationSchema,
}) => {
  const vals = validationSchema.cast(initialValues || {});

  return (
    <Formik
      initialValues={vals}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, setStatus, resetForm }) => (
        handleSubmit(mutation, values, setSubmitting, setStatus, resetForm)
      )}
      render={props => (
        <Form>
          <FormComponent
            entryIsSelf={entryIsSelf}
            selfIsAdmin={selfIsAdmin}
            {...props}
          />
          <button
            type="submit"
            className="button-primary u-full-width"
            disabled={props.isSubmitting || !props.isValid}
            onClick={props.handleSubmit}
          >
            Submit
          </button>
          {
            props.status
              ? <div className={`status-message ${props.status.type}`}>{props.status.message}</div>
              : undefined
          }
        </Form>
      )}
    />
  );
};

EntryFormWrapper.defaultProps = {
  entryIsSelf: false,
  initialValues: null,
  selfIsAdmin: false,
};

EntryFormWrapper.propTypes = {
  entryIsSelf: PropTypes.bool,
  FormComponent: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]).isRequired,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: (props, propName, componentName) => {
    props.validationSchema
      .isValid(props[propName])
      .then((valid) => {
        if (!valid) {
          return new Error(`Invalid prop ${propName} supplied to ${componentName}.`);
        }
        return true;
      });
  },
  mutation: PropTypes.func.isRequired,
  selfIsAdmin: PropTypes.bool,
  validationSchema: PropTypes.object.isRequired,
};

export default EntryFormWrapper;
