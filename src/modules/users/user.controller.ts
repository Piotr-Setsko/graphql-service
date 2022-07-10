import { RESTDataSource } from 'apollo-datasource-rest';
import { User } from './user.interface';

export class UserAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3004/v1/users';
  }

  async getUser(id: string) {
    return this.get(`/${encodeURIComponent(id)}`);
  }

  async registerUser(userData: User) {
    return this.post(
      'register',
      userData
    );
  }

  async loginUser(userData: User) {
    return this.post('login', userData);
  }
}

