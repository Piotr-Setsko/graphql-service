import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';

export class FavoriteAPI extends RESTDataSource {
  constructor() {
    super();

    this.baseURL = 'http://localhost:3007/v1/favourites';
  }

  async willSendRequest(request: RequestOptions) {
    request.headers.set('Authorization', this.context.token);
  }

  async getFavouritesAll(limit = 5, offset = 0) {
    return this.get('', {
      "limit": limit,
      "offset": offset
    });
  }

  async addTrackToFavourites(data: any) {
    return this.put('add', data);
  }
}