import React from 'react';
import { useFormikContext } from 'formik';

const FormStatus = () => {
  const { status } = useFormikContext();

  if (!status || !status.type || !status.message) {
    return null;
  }

  return (
    <div className={`status-message ${status.type}`}>
      {status.message}
    </div>
  );
};

export default FormStatus;
