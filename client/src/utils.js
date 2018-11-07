import * as constants from './constants';

export const isAuthenticated = () => {
  // TODO: clear out key if call to DB fails due to authentication
  return !!sessionStorage.getItem(constants.SESSION_STORAGE_KEY);
};
