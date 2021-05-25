import { useFormikContext } from 'formik';
import React from 'react';

import { useHistory } from 'react-router-dom';

export const DeleteButton = ({
  data,
  deleteMutation,
  deleteMutationName,
}) => {
  const {
    isSubmitting,
    setSubmitting,
    setStatus,
    resetForm,
    values,
  } = useFormikContext();
  const history = useHistory();

  if (!data || !data.id) {
    // suppress delete button for new entry
    return null;
  }

  const handleDelete = async (values, setSubmitting, setStatus) => {
    if (!deleteMutation) return;

    setStatus(null);

    try {
      const payload = { variables: { id: values.id } };
      const { data, errors } = await deleteMutation(payload);
      const success = data[deleteMutationName];

      if (success && !errors) {
        history.push('/dashboard/edit/delete-successful');
        return;
      }

      setStatus({
        type: 'error',
        message: errors
          ? errors.map(({ message }) => message).join('; ')
          : 'Failed to delete record. Please try again later.',
      });
    } catch (err) {
      setStatus({
        type: 'error',
        message: err.message,
      });
    }

    setSubmitting(false);
  };

  return (
    <button
      className={`button-delete u-full-width`}
      disabled={isSubmitting || !data.deletable}
      onClick={() => handleDelete(values, setSubmitting, setStatus, resetForm)}
      title={data.deletable ? 'delete this record' : 'record cannot be deleted'}
      type="button"
    >
      Delete
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
