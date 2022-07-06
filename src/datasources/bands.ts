import { RESTDataSource } from 'apollo-datasource-rest';

export class BandAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3003/v1/bands';
  }

  async getBandAll() {
    return this.get('');
  }

  async getBand(id: string) {
    return this.get(`/${encodeURIComponent(id)}`);
  }
}
