import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import {
  CREATE_COUNTRY,
  DELETE_COUNTRY,
  UPDATE_COUNTRY
} from '../../../mutations';
import { COUNTRY_BY_ID } from '../../../queries';
import {
  addIdToSchema,
  getInitialFormValuesForSchema,
  countryValidationSchema
} from '../../../validationSchemas';

import EntryFormButtons, { DeleteButton } from '../EntryFormButtons';
import EntryFormWrapper from '../EntryFormWrapper';
import QueryWrap from '../QueryWrap';
import CountryFormFields from './CountryFormFields';

const CountryForm = ({ match, successCallback }) => {
  const [createMutation] = useMutation(CREATE_COUNTRY);
  const [updateMutation] = useMutation(UPDATE_COUNTRY);
  const [deleteMutation] = useMutation(DELETE_COUNTRY);

  const id = match && match.params && match.params.id
    ? match.params.id
    : null;

  const schema = id
    ? addIdToSchema(countryValidationSchema)
    : countryValidationSchema;

  if (id) {
    // updating
    return (
      <QueryWrap
        id={id}
        query={COUNTRY_BY_ID}
        queryName="country"
      >
        {
          (data) => {
            return (
              <EntryFormWrapper
                initialValues={getInitialFormValuesForSchema(schema, data)}
                mutation={updateMutation}
                mutationName="updateCountry"
                successCallback={successCallback}
                yupSchema={schema}
              >
                <h3>Edit Country</h3>
                <CountryFormFields />
                <EntryFormButtons>
                  <DeleteButton
                    data={data}
                    deleteMutation={deleteMutation}
                    deleteMutationName="toggleDeleteCountry"
                    yupSchema={schema}
                  />
                </EntryFormButtons>
              </EntryFormWrapper>
            );
          }
        }
      </QueryWrap>
    );
  }

  // creating
  return (
    <EntryFormWrapper
      clearAfterSubmit
      initialValues={getInitialFormValuesForSchema(schema)}
      mutation={createMutation}
      mutationName="createCountry"
      successCallback={successCallback}
      yupSchema={schema}
    >
      <h3>New Country</h3>
      <CountryFormFields />
      <EntryFormButtons />
    </EntryFormWrapper>
  );
};

CountryForm.defaultProps = {
  successCallback: null,
};

CountryForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  successCallback: PropTypes.func,
};

export default CountryForm;
