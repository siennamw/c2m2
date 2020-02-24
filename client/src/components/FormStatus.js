import React from 'react';
import { useFormikContext } from 'formik';

import StatusMessage from './StatusMessage';

const FormStatus = () => {
  const { status } = useFormikContext();

  if (!status || !status.type || !status.message) {
    return null;
  }

  return (
    <StatusMessage message={status.message} type={status.type} fade />
  );
};

export default FormStatus;
