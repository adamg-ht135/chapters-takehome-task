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
  
  async login({ email , password } : { email: string, password: string}): Promise<UserResponse> {
    const response = await this.axios.post('/api/login/', {
      email,
      password,
    });
    return response.data;
  }

  async register({ email, first_name, last_name, username, password, role, marketing_consent} : { email: string, username: string, first_name: string, last_name: string,  role: string, password: string, marketing_consent: boolean}): Promise<UserResponse> {
    const response = await this.axios.post('/api/v1/register/', {
      email,
      username,
      first_name,
      last_name,
      password,
      role,
      marketing_consent,
    });
    return response.data;
  }
}
