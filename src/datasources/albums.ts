import { RESTDataSource } from 'apollo-datasource-rest';

export class AlbumAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3005/v1/albums';
  }

  async getAlbumsAll() {
    return this.get('');
  }

  async getAlbum(id: string) {
    return this.get(`/${encodeURIComponent(id)}`);
  }
}