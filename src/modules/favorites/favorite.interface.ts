export interface Favourite {
  _id: string;
  userId: string;
  bandsIds: string[];
  genresIds: string[];
  artistsIds: string[];
  tracksIds: string[];
}

export interface FavouriteInput {
  type: string;
  id: string;
}