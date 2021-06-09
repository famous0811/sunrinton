import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

interface ApiUriTypes {
  production: string;
  development: string;
  test: string;
}

function apiUri(): string {
  if (!process.env.REACT_APP_PROD_API_URI || !process.env.REACT_APP_DEV_API_URI)
    throw new Error('API URI not defined. (ENV)');

  const apiUriPreference: ApiUriTypes = {
    production: process.env.REACT_APP_PROD_API_URI,
    development: process.env.REACT_APP_DEV_API_URI,
    test: process.env.REACT_APP_DEV_API_URI,
  };

  return apiUriPreference[process.env.NODE_ENV];
}

const baseClient = axios.create({
  baseURL: apiUri(),
  headers: {
    'Access-Control-Expose-Headers': 'x-access-token',
  },
});

// It renews access token
async function renewAccessToken(): Promise<{ result: boolean }> {
  const refreshToken = localStorage.getItem('refresh-token');
  if (!refreshToken) {
    return { result: false };
  }
  return baseClient
    .post('auth/resign', { token: refreshToken })
    .then((res) => {
      baseClient.defaults.headers.common['x-access-token'] =
        res.data.data.token;
      localStorage.setItem('access-token', res.data.data.token);
      return { result: true };
    })
    .catch((err) => {
      console.error(err.response.data);
      return { result: false };
    });
}

export async function resolver(
  config: AxiosRequestConfig,
): Promise<AxiosResponse<any>> {
  return baseClient
    .request(config)
    .then((result) => {
      return { ...result.data };
    })
    .catch(async (result) => {
      if (result.response) {
        // Request has been resolved with code 400 ~ 500
        console.error(
          `Error ${result.response.data.status} : ${result.response.data.message}`,
        );
        if (result.response.data.code === 'TOKEN_EXPIRED') {
          console.info('Retrying Login...');
          if (!(await renewAccessToken()).result) {
            return { ...result };
          } else {
            return await resolver(config);
          }
        }
      } else if (result.request) {
        // Request failed
        console.log(result.request);
      } else {
        // Error on request processing
        console.log('Error', result.message);
      }
    });
}

// Translate methods to config JSON
export const client = {
  request: (config: AxiosRequestConfig): Promise<AxiosResponse<any>> =>
    resolver(config),
  get: (
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> =>
    resolver({
      ...config,
      url,
      method: 'get',
    }),
  delete: (
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> =>
    resolver({ ...config, url, method: 'delete' }),
  head: (
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> =>
    resolver({ ...config, url, method: 'head' }),
  options: (
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> =>
    resolver({ ...config, url, method: 'options' }),
  post: (
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> =>
    resolver({ ...config, url, data, method: 'post' }),
  put: (
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> =>
    resolver({ ...config, url, data, method: 'put' }),
  patch: (
    url: string,
    data: any,
    config?: AxiosRequestConfig,
  ): Promise<AxiosResponse<any>> =>
    resolver({ ...config, url, data, method: 'patch' }),
};

export default { resolver, ...client, baseClient };
