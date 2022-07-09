import { RESTDataSource } from 'apollo-datasource-rest';
import { Artist } from './artist.interface';

export class ArtistAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3002/v1/artists';
  }

  async getArtistsAll(limit = 5, offset = 0) {
    return this.get('', {
      "limit": limit,
      "offset": offset
    });
  }

  async getArtist(id: string) {
    return this.get(`/${encodeURIComponent(id)}`);
  }

  async createArtist(data: Artist) {
    return this.post('', data);
  }

  async updateArtist(id: string, data: Artist) {
    return this.put(`/${encodeURIComponent(id)}`, data);
  }

  async deleteArtist(id: string) {
    return this.delete(`/${encodeURIComponent(id)}`);
  }

  async getMember(id: string) {
    return await this.getArtist(id);
  }
}