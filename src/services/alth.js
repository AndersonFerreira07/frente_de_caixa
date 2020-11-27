import api from './api';

export const TOKEN_KEY = '@caruaruFriosToken';
export const REFRESH_TOKEN_KEY = '@caruaruFriosRefreshToken';
export const CARGO = '@cargo';
export const CARGOOBJ = '@cargoobj';
export const USER_ID = '@userId';
export const SESSION_ID = '@sessionId';

// export const USERNAME = '@username'
export const USERNAME = 'username';

export const isAuthenticated = () => {
  const isAuth = localStorage.getItem(REFRESH_TOKEN_KEY) !== null;
  return isAuth;
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const login = (token, refreshToken) => {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
};

export const setNewToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const getCargo = () => {
  const cargo = String(localStorage.getItem(CARGO));
  return parseInt(cargo, 10);
};

export const setCargo = (cargo) => localStorage.setItem(CARGO, String(cargo));

export const setUsername = (username) =>
  localStorage.setItem(USERNAME, username);

export const getUsername = () => localStorage.getItem(USERNAME);

export const getCargoObj = () => {
  return JSON.parse(localStorage.getItem(CARGOOBJ));
};

export const setCargoObj = (cargo) => {
  localStorage.setItem(CARGOOBJ, JSON.stringify(cargo));
};

export const setUserId = (user_id) =>
  localStorage.setItem(USER_ID, String(user_id));

export const getUserId = () => {
  const user_id = String(localStorage.getItem(USER_ID));
  return parseInt(user_id, 10);
};

export const setSessionId = (sessionId) =>
  localStorage.setItem(SESSION_ID, String(sessionId));

export const getSessionId = () => {
  const sessionId = localStorage.getItem(SESSION_ID);
  return parseInt(sessionId, 10);
};

export const logout = async () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(CARGO);
  localStorage.removeItem(USERNAME);
  localStorage.removeItem(CARGOOBJ);
  localStorage.removeItem(USER_ID);

  await api.delete(`/logot/${getSessionId()}`);

  localStorage.removeItem(SESSION_ID);
};
