import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { Band } from './band.interface';

export class BandAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3003/v1/bands';
  }

  async willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }

  async getBandAll(limit = 5, offset = 0) {
    return this.get('', {
      "limit": limit,
      "offset": offset
    });
  }

  async getBand(id: string) {
    return this.get(`/${encodeURIComponent(id)}`);
  }

  async createBand(data: Band) {
    return this.post('', data);
  }

  async updateBand(id: string, data: Band) {
    return this.put(`/${encodeURIComponent(id)}`, data);
  }

  async deleteBand(id: string) {
    return this.delete(`/${encodeURIComponent(id)}`);
  }
}
