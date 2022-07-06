import { RESTDataSource } from 'apollo-datasource-rest';
const albums = [{id:"123", name: "Nirvana"}, {id:"1234", name: "Prodigy"}];

export class AlbumAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3005/v1/albums';
  }

  async getAlbumsAll() {
    return this.get('');
  }
}