import axiosClient from '@api/axiosClient';

export default async function (): Promise<any> {
  axiosClient.baseClient.defaults.headers.common[
    'x-access-token'
  ] = localStorage.getItem('access-token');
  return await axiosClient.get('/user/test/user');
}
