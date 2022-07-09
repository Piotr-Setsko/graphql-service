import { RESTDataSource } from 'apollo-datasource-rest';

export class UserAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3004/v1/users';
  }

  async getUser(id: string) {
    return this.get(`/${encodeURIComponent(id)}`);
  }

  async registerUser(userData: any) {
    return this.post(
      'register',
      userData
    );
  }

  async loginUser(userData: any) {
    return this.post('login', userData);
  }

  // async verifyUser(token: any) {
  //   return this.get('verify', token);
  // }
}

