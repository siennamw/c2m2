import React, { Fragment, useState } from 'react';
import * as yup from 'yup';
import { useMutation } from '@apollo/react-hooks';
import {
  ErrorMessage,
  Field,
  Form,
  Formik,
} from 'formik';

import { StyledSelect } from '../entries/SelectField';
import { UPLOAD_CSV } from '../../mutations';
import { MODEL_NAMES } from '../../constants';

import { reactSelectOnChange } from '../../utils';
import BulkUploadReport from './BulkUploadReport';

const BulkUpload = () => {
  const [report, setReport] = useState();
  const [mutate] = useMutation(UPLOAD_CSV);
  const mutationName = 'bulkUpload';

  const modelsForUpload = MODEL_NAMES.filter(name => (
    !['material_format', 'media_type'].includes(name)
  ));
  const modelOptions = modelsForUpload.map(m => ({ label: m, value: m }));

  const initialValues = {
    model: '',
  };
  const validationSchema = yup.object().shape({
    model: yup.string().oneOf(modelsForUpload).required(),
  });

  return (
    <Fragment>
      <h1>Bulk Upload</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {
          ({
            isSubmitting,
            isValid,
            setFieldTouched,
            setFieldValue,
            setStatus,
            setSubmitting,
            status,
            values,
          }) => {
            const touchedOnBlur = (field) => {
              setFieldTouched(field, true);
            };

            const selectOnChange = (evt, name) => {
              reactSelectOnChange(evt, name, setFieldValue);
            };

            const submit = async ({ target: { validity, files: [file] } }) => {
              setStatus(null);
              setReport(null);
              // disable until refresh to avoid inadvertent submissions
              setSubmitting(true);

              try {
                if (!isValid || !validity.valid) {
                  return;
                }

                const { data, errors } = await mutate({
                  variables: {
                    file,
                    model: values.model,
                  },
                });

                if (!errors && data && data[mutationName]) {
                  setStatus({
                    type: 'success',
                    message: 'Success! See import report below for details.',
                  });
                  setReport(data[mutationName]);
                } else {
                  setStatus({
                    type: 'error',
                    message: errors
                      ? errors.map(({ message }) => message).join('; ')
                      : 'Failed. Please try again later.',
                  });
                }
              } catch (err) {
                console.error(err);
                setStatus({
                  type: 'error',
                  message: err.message
                    ? err.message
                    : JSON.stringify(err),
                });
              }
            };

            return (
              <Form>
                <label htmlFor="model">
                  Model
                  <ErrorMessage
                    name="model"
                    component="div"
                    className="status-message form-message error"
                  />
                  <StyledSelect
                    disabled={isSubmitting}
                    fieldName="model"
                    id="model"
                    onBlur={() => touchedOnBlur('model')}
                    onChange={evt => selectOnChange(evt, 'model')}
                    options={modelOptions}
                    value={modelOptions.find(opt => opt.value === values.model) || null}
                  />
                </label>
                <label htmlFor="file">
                  CSV file
                  <ErrorMessage
                    className="status-message form-message error"
                    component="div"
                    name="file"
                  />
                  <Field
                    accept=".csv"
                    className="u-full-width"
                    disabled={isSubmitting || !values.model}
                    id="file"
                    name="file"
                    onChange={submit}
                    required
                    type="file"
                  />
                </label>
                {
                  status
                    ? (
                      <div className={`status-message ${status.type}`}>
                        {status.message}
                      </div>
                    )
                    : undefined
                }
              </Form>
            );
          }
        }
      </Formik>
      <BulkUploadReport report={report} />
    </Fragment>
  );
};

export default BulkUpload;
