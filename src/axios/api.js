import axios from 'axios';
import { getLocalStorage } from '../utils/storageUtils';

// 토큰이 필요 없는 경우
const instance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 토큰이 필요한 경우
const authInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

// 로그인 할 때 token 처리를 interceptor로 해야함
authInstance.interceptors.request.use(
  (config) => {
    const token = getLocalStorage();
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { instance, authInstance };
