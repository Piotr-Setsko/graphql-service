import { RESTDataSource } from 'apollo-datasource-rest';

export class GenreAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3001/v1/genres';
  }

  async getGenresAll(limit = 3) {
    return this.get('', {
      "limit": limit,
      "offset": 0
    });
  }
}