import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/react-hooks';

import {
  CREATE_CATALOGER,
  UPDATE_CATALOGER_ADMIN,
  UPDATE_CATALOGER_SELF,
} from '../../../mutations';
import { CATALOGER_BY_ID_LEAN } from '../../../queries';
import {
  addIdToSchema, addPasswordsToSchema,
  catalogerValidationSchema,
  getInitialFormValuesForSchema,
} from '../../../validationSchemas';

import { AuthContext } from '../../AuthContext';

import CatalogerFormFields, { CatalogerFormFieldsNoPasswords } from './CatalogerFormFields';
import EntryFormButtons from '../EntryFormButtons';
import EntryFormWrapper from '../EntryFormWrapper';
import QueryWrap from '../QueryWrap';
import StatusMessage from '../../StatusMessage';
import { Link } from 'react-router-dom';

const CatalogerForm = ({ match, location, successCallback }) => {
  const { admin, id: ownId } = useContext(AuthContext);
  const [createMutation] = useMutation(CREATE_CATALOGER);
  const [updateCatalogerMutation] = useMutation(UPDATE_CATALOGER_ADMIN);
  const [updateSelfMutation] = useMutation(UPDATE_CATALOGER_SELF);

  const editingOwnAccount = location.pathname === '/dashboard/account';

  if (editingOwnAccount) {
    // editing own account
    const schema = addIdToSchema(addPasswordsToSchema(catalogerValidationSchema));

    return (
      <QueryWrap
        id={ownId}
        query={CATALOGER_BY_ID_LEAN}
        queryName="cataloger"
      >
        {
          (data) => {
            return (
              <EntryFormWrapper
                initialValues={getInitialFormValuesForSchema(schema, data)}
                mutation={updateSelfMutation}
                mutationName="updateCatalogerSelf"
                successCallback={successCallback}
                yupSchema={schema}
              >
                <h3>Update Account</h3>
                <CatalogerFormFields />
                <EntryFormButtons />
              </EntryFormWrapper>
            );
          }
        }
      </QueryWrap>
    );
  }

  if (!admin) {
    return (
      <>
        <StatusMessage
          message="Sorry! Only administrators can create and edit catalogers."
          type="error"
        />
        <p className="center-text">
          If you are trying to update your own information,{' '}
          <Link to="/dashboard/account">
            click here to edit your account
          </Link>
          .
        </p>
      </>
    );
  }

  const id = match && match.params && match.params.id
    ? Number(match.params.id)
    : null;

  if (id) {
    // updating cataloger (not self, no passwords)
    const schema = addIdToSchema(catalogerValidationSchema);

    return (
      <QueryWrap
        id={id}
        query={CATALOGER_BY_ID_LEAN}
        queryName="cataloger"
      >
        {
          (data) => {
            return (
              <EntryFormWrapper
                initialValues={getInitialFormValuesForSchema(schema, data)}
                mutation={updateCatalogerMutation}
                mutationName="updateCatalogerAdmin"
                successCallback={successCallback}
                yupSchema={schema}
              >
                <h3>Edit Cataloger</h3>
                <CatalogerFormFieldsNoPasswords />
                <EntryFormButtons />
              </EntryFormWrapper>
            );
          }
        }
      </QueryWrap>
    );
  }

  // creating (also no passwords)
  return (
    <EntryFormWrapper
      clearAfterSubmit
      initialValues={getInitialFormValuesForSchema(catalogerValidationSchema)}
      mutation={createMutation}
      mutationName="createCataloger"
      successCallback={successCallback}
      yupSchema={catalogerValidationSchema}
    >
      <h3>New Cataloger</h3>
      <CatalogerFormFieldsNoPasswords />
      <EntryFormButtons />
    </EntryFormWrapper>
  );
};

CatalogerForm.defaultProps = {
  self: false,
  successCallback: null,
};

CatalogerForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  self: PropTypes.bool,
  successCallback: PropTypes.func,
};

export default CatalogerForm;
