import { useFormikContext } from 'formik';
import React from 'react';
import { isEmpty } from 'lodash';

import { getInitialFormValuesForSchema } from '../../validationSchemas';

export const DeleteButton = ({
  data,
  deleteMutation,
  deleteMutationName,
  yupSchema
}) => {
  const {
    isSubmitting,
    setSubmitting,
    setStatus,
    resetForm,
    values,
  } = useFormikContext();

  if (!data || !data.id || !data.deletable) {
    // new entry or entry cannot be deleted,
    // suppress delete button
    return null;
  }

  const handleDelete = async (values, setSubmitting, setStatus, resetForm) => {
    if (!deleteMutation) return;

    setStatus(null);

    try {
      const payload = { variables: { id: values.id } };
      const { data, errors } = await deleteMutation(payload);

      if (!errors && data && !isEmpty(data)) {
        if (data[deleteMutationName]) {
          resetForm(getInitialFormValuesForSchema(yupSchema, data[deleteMutationName]));
        }

        setStatus({
          type: 'success',
          message: 'Success!',
        });
      } else {
        setStatus({
          type: 'error',
          message: errors
            ? errors.map(({ message }) => message).join('; ')
            : 'Failed to delete record. Please try again later.',
        });
      }
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message,
      });
    }

    setSubmitting(false);
  };

  const action = data.deleted ? 'un-delete' : 'delete';

  return (
    <button
      className={`button-${action} u-full-width`}
      disabled={isSubmitting}
      onClick={() => handleDelete(values, setSubmitting, setStatus, resetForm)}
      title={`${action} this record`}
      type="button"
    >
      {action}
    </button>
  );
};

const EntryFormButtons = ({ children }) => {
  const { isSubmitting, dirty } = useFormikContext();

  return (
    <div className="buttons-parent">
      {children}
      <button
        type="submit"
        className="button-primary u-full-width"
        disabled={isSubmitting || !dirty}
      >
        Submit
      </button>
    </div>
  );
};

export default EntryFormButtons;
