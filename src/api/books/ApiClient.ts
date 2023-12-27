import { AxiosInstance } from 'axios';

export default class ApiClient {
  private readonly axios: AxiosInstance;

  constructor(axios: AxiosInstance) {
    this.axios = axios;
    axios.defaults.withCredentials = true;
  }

  async readBook(token: string, id: number): Promise<any> {
    const response = await this.axios.get(`/api/v1/books/${id}`, {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  }

  async listBooks(token: string): Promise<any> {
    const response = await this.axios.get('/api/v1/books/', {
      headers: {
        Authorization: `${token}`,
      },
    });
    return response;
  }

  async createBook(token: string, { title, author, date_published } : { title: string, author: number, date_published: string}): Promise<any> {
    const response = await this.axios.post('/api/v1/books/', {
        title,
        author,
        date_published,
      }, {
        headers: {
          Authorization: `${token}`,
        },
      });
    return response;
  }
}
