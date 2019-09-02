import React from 'react';
import * as constants from './constants';

export const isAuthenticated = () => !!localStorage.getItem(constants.LOCAL_STORAGE_KEY);

export const getAuthorizationToken = () => {
  if (isAuthenticated()) {
    return localStorage.getItem(constants.LOCAL_STORAGE_KEY);
  }
};

export const signIn = (token) => {
  localStorage.setItem(constants.LOCAL_STORAGE_KEY, token);
};

export const signOut = () => {
  localStorage.removeItem(constants.LOCAL_STORAGE_KEY);
};

export const wrapWithLink = (itemName, itemID, itemType) => (
  <a href={`/${itemType}/${itemID}`}>{itemName}</a>
);

export const reactSelectOnChange = (evt, name, setFieldValue) => {
  if (name.includes('_ids')) {
    // multiselect
    setFieldValue(
      name,
      evt ? evt.map(option => option.value) : [],
    );
  } else {
    setFieldValue(
      name,
      evt ? evt.value : '',
    );
  }
};
