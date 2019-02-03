import * as constants from './constants';

export const isAuthenticated = () => !!localStorage.getItem(constants.LOCAL_STORAGE_KEY);

export const getAuthorizationToken = () => {
  if (isAuthenticated()) {
    return localStorage.getItem(constants.LOCAL_STORAGE_KEY);
  }
};

export const signOut = () => {
  localStorage.removeItem(constants.LOCAL_STORAGE_KEY);
};
