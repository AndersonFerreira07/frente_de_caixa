export const HOST = '@host';

export const getHost = () => {
  const host = localStorage.getItem(HOST);
  if (host === null) {
    return process.env.REACT_APP_HOST_API;
  }
  return host;
};

export const setHost = (host) => localStorage.setItem(HOST, host);
