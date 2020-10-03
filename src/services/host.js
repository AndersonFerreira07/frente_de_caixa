export const HOST = '@host';

export const getHost = () => {
  const host = localStorage.getItem(HOST);
  if (host === null) {
    return 'https://caruarufriosbackend.herokuapp.com';
  }
  return host;
};

export const setHost = (host) => localStorage.setItem(HOST, host);
