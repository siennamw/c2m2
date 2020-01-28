import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import NewEntry from '../NewEntry';

import CatalogerForm from './CatalogerForm';
import { CREATE_CATALOGER } from '../../../mutations';
import { catalogerValidationSchema } from '../../../validationSchemas';
import { AuthContext } from '../../AuthContext';

const NewCataloger = ({ successCallback }) => {
  const { admin } = useContext(AuthContext);

  if (admin) {
    return (
      <NewEntry
        successCallback={successCallback}
        clearAfterSubmit
        FormComponent={CatalogerForm}
        gqlMutation={CREATE_CATALOGER}
        mutationName="createCataloger"
        title="New Cataloger"
        yupSchema={catalogerValidationSchema}
      />
    );
  }

  return (
    <div className="status-message error">
      Sorry! Only administrators can create new catalogers.
    </div>
  );
};

NewCataloger.defaultProps = {
  successCallback: null,
};

NewCataloger.propTypes = {
  successCallback: PropTypes.func,
};

export default NewCataloger;
