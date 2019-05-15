import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import InputField from '../InputField';

const CatalogerForm = ({ entryIsSelf, selfIsAdmin }) => {
  return (
    <Fragment>
      <InputField displayName="Name" fieldName="name" />
      <InputField displayName="Email" fieldName="email" fieldType="email" />
      <InputField displayName="Description" fieldName="description" />
      <InputField
        displayName="Password"
        fieldName="password"
        fieldType="password"
      />
    </Fragment>
  );
};

CatalogerForm.defaultProps = {
  entryIsSelf: false,
  selfIsAdmin: false,
};

CatalogerForm.propTypes = {
  entryIsSelf: PropTypes.bool,
  selfIsAdmin: PropTypes.bool,
};

export default CatalogerForm;
