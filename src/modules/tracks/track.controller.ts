import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { Track } from './track.interface';

export class TrackAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3006/v1/tracks';
  }

  async willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }

  async getTrack(id: string) {
    return this.get(`/${encodeURIComponent(id)}`);
  }

  async getTracksAll(limit = 5, offset = 0) {
    return this.get('', {
      "limit": limit,
      "offset": offset
    });
  }

  async createTrack(data: Track) {
    return this.post('', data);
  }

  async changeTrack(id: string, data: Track) {
    return this.put(`/${encodeURIComponent(id)}`, data);
  }

  async deleteTrack(id: string) {
    return this.delete(`/${encodeURIComponent(id)}`);
  }
}