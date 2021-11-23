import axios, { AxiosRequestConfig } from 'axios';
import { TIMEOUT } from 'src/constants/constants';
import Cookies from 'js-cookie';

const axiosInstance = axios.create({
  baseURL: `${process.env.BASE_URL}/${process.env.API_VERSION}`,
  timeout: TIMEOUT,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    const accessToken = Cookies.get('access_token');

    if (!!accessToken) {
      const domain = process.env.COOKIE_DOMAIN || '';
      Cookies.remove('access_token', { domain });
    }

    if (accessToken) {
      if (!config?.headers) {
        throw new Error(`Expected 'config' and 'config.headers' not to be undefined`);
      }

      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

axios.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    if (!error.response) {
      return Promise.reject(error);
    }

    switch (error?.response?.status) {
      case 401:
        break;
      case 403:
        break;
      default:
    }
  },
);

export default axiosInstance;
