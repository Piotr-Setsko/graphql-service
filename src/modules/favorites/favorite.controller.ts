import { RequestOptions, RESTDataSource } from 'apollo-datasource-rest';
import { FavouriteInput } from './favorite.interface';

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

  async addTrackToFavourites(data: FavouriteInput) {
    return this.put('add', data);
  }

  async addBandToFavourites(data: FavouriteInput) {
    return this.put('add', data);
  }

  async addArtistToFavourites(data: FavouriteInput) {
    return this.put('add', data);

  }

  async addGenreToFavourites(data: FavouriteInput) {
    return this.put('add', data);
  }

  async removeTrackFromFavourites(data: FavouriteInput) {
    return this.put('remove', data);
  }
}