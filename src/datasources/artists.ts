import { RESTDataSource } from 'apollo-datasource-rest';

export class ArtistAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3002/v1/artists';
  }

  async getArtistsAll(limit=5) {
    return this.get('', {
      "limit": limit,
      "offset": 0
    });
  }

  async getArtist(id: string) {
    return this.get(`/${encodeURIComponent(id)}`);
  }

  async getMember(id: string) {
    return await this.getArtist(id);
  }
}