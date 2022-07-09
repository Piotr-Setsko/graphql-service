import { RESTDataSource } from 'apollo-datasource-rest';
import { Album } from './album.interface';

export class AlbumAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3005/v1/albums';
  }

  async getAlbums(limit = 5, offset = 0) {
    return this.get('', {
      "limit": limit,
      "offset": offset
    });
  }

  async getAlbum(id: string) {
    return this.get(`/${encodeURIComponent(id)}`);
  }

  async createAlbum(data: Album) {
    return this.post('', data);
  }

  async updateAlbum(id: string, data: Album) {
    return this.put(`/${encodeURIComponent(id)}`, data);
  }

  async deleteAlbum(id: string) {
    return this.delete(`/${encodeURIComponent(id)}`);
  }
}