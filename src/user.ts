import { RESTDataSource } from 'apollo-datasource-rest';

export class UserAPI extends RESTDataSource {
  constructor() {
    // Always call super()
    super();
    // Sets the base URL for the REST API
    this.baseURL = 'http://localhost:3004/v1/users';
  }

  async getUser(id: string) {
    // Send a GET request to the specified endpoint
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
}

