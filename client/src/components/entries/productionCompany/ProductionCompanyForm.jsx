import React from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';

import {
  CREATE_PRODUCTION_COMPANY,
  DELETE_PRODUCTION_COMPANY,
  UPDATE_PRODUCTION_COMPANY
} from '../../../mutations';
import { PRODUCTION_COMPANY_BY_ID } from '../../../queries';
import {
  addIdToSchema,
  getInitialFormValuesForSchema,
  productionCompanyValidationSchema
} from '../../../validationSchemas';

import EntryFormButtons, { DeleteButton } from '../EntryFormButtons';
import EntryFormWrapper from '../EntryFormWrapper';
import QueryWrap from '../QueryWrap';
import ProductionCompanyFormFields from './ProductionCompanyFormFields';

const ProductionCompanyForm = ({ match, successCallback }) => {
  const [createMutation] = useMutation(CREATE_PRODUCTION_COMPANY);
  const [updateMutation] = useMutation(UPDATE_PRODUCTION_COMPANY);
  const [deleteMutation] = useMutation(DELETE_PRODUCTION_COMPANY);

  const id = match && match.params && match.params.id
    ? match.params.id
    : null;

  const schema = id
    ? addIdToSchema(productionCompanyValidationSchema)
    : productionCompanyValidationSchema;

  if (id) {
    // updating
    return (
      <QueryWrap
        id={id}
        query={PRODUCTION_COMPANY_BY_ID}
        queryName="production_company"
      >
        {
          (data) => {
            return (
              <EntryFormWrapper
                initialValues={getInitialFormValuesForSchema(schema, data)}
                mutation={updateMutation}
                mutationName="updateProductionCompany"
                successCallback={successCallback}
                yupSchema={schema}
              >
                <h3>Edit Production Company</h3>
                <ProductionCompanyFormFields />
                <EntryFormButtons>
                  <DeleteButton
                    data={data}
                    deleteMutation={deleteMutation}
                    deleteMutationName="deleteProductionCompany"
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
      mutationName="createProductionCompany"
      successCallback={successCallback}
      yupSchema={schema}
    >
      <h3>New Production Company</h3>
      <ProductionCompanyFormFields />
      <EntryFormButtons />
    </EntryFormWrapper>
  );
};

ProductionCompanyForm.defaultProps = {
  successCallback: null,
};

ProductionCompanyForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  successCallback: PropTypes.func,
};

export default ProductionCompanyForm;
