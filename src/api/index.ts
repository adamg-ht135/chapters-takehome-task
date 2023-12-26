import Axios from 'axios';

import config from '@/config';
import { useNotificationStore } from '@/stores/notifications';
import UsersClient from './users/ApiClient';
import BooksClient from './books/ApiClient';

export const axios = Axios.create({
  baseURL: config.API_URL,
});

axios.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    useNotificationStore.getState().addNotification({
      type: 'error',
      title: 'Error',
      message,
    });
    return Promise.reject(error);
  }
);

export default class ApiClient {
  static users = new UsersClient(axios);
  static books = new BooksClient(axios);
}
