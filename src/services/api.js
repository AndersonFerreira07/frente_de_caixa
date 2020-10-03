import axios from 'axios';

// import { HOST_API } from '../utils/hostAPI';
// import {
//   getToken,
//   // getRefreshToken,
//   // setNewToken
// } from './alth';
import { getHost } from './host';

const api = axios.create({
  // baseURL: 'https://caruarufriosbackend.herokuapp.com',
  baseURL: getHost(),
});

api.interceptors.request.use(async (config) => {
  /* const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.baseURL = getHost(); */
  return config;
});

/* api.interceptors.response.use(response => {
    return response;
}, error => {
    const { config, response: { status } } = error;
    const originalRequest = config;

    if (status === 401) {
        const retryOrigReq = new Promise((resolve, reject) => {
            resolve(axios({ method: 'GET', url: `${HOST_API}/newToken`, headers: { refreshToken: getRefreshToken() } }))
        }).then(function (result) {
            setNewToken(result.data.token)
            return new Promise((resolve, reject) => {
                originalRequest.headers['Authorization'] = 'Bearer ' + result.data.token;
                resolve(axios(originalRequest));
            });
        });
        return retryOrigReq;
    } else {
        return Promise.reject(error);
    }
}); */

export default api;
