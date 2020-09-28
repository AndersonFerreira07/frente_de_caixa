export const HOST = '@host';

export const getHost = () => {
  const host = localStorage.getItem(HOST);
  if (host === null) {
    return 'http://localhost:3333';
  }
  return host;
};

export const setHost = (host) => localStorage.setItem(HOST, host);
