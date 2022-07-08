import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export class GenreAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3001/v1/genres';
  }

  async willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }

  async getGenresAll(limit = 3) {
    return this.get('', {
      "limit": limit,
      "offset": 0
    });
  }

  async getGenre(id: string) {
    return this.get(`/${encodeURIComponent(id)}`);
  }

  async createGenre(genreData: any) {
    return this.post('', genreData)
  }

  async changeGenre(id: string, data: any) {
    return this.put(`/${encodeURIComponent(id)}`, data);
  }

  async deleteGenre(id: string) {
    return this.delete(`/${encodeURIComponent(id)}`);
  }
}