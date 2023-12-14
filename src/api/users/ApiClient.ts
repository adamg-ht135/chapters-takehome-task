import { AxiosInstance } from 'axios';
import { UserResponse } from './types';

export default class ApiClient {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
  }

  async get(): Promise<UserResponse[]> {
    const response = await this.axios.get('/users');
    return response.data;
  }
  
  async login({ name , password } : { name: string, password: string}): Promise<UserResponse> {
    const response = await this.axios.post('/login', {
      name,
      password,
    });
    return response.data;
  }
}
