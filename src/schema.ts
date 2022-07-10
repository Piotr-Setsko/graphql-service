import { gql } from 'apollo-server';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { trackTypeDefs } from './modules/tracks/schemas/track.schema';
import { favoriteTypeDefs } from './modules/favorites/schemas/favorite.schema';
import { artistTypeDefs } from './modules/artists/schemas/artist.schema';
import { albumTypeDefs } from './modules/albums/schemas/album.schema';
import { bandTypeDefs } from './modules/bands/schemas/band.schema';
import { genreTypeDefs } from './modules/genres/schemas/genre.schema';
import { userTypeDefs } from './modules/users/schemas/user.schema';

const sharedTypeDefs = gql`
  type DEL {
    acknowledged: Boolean
    deletedCount: Int
  }
`;

export const typeDefs = mergeTypeDefs([
  albumTypeDefs,
  artistTypeDefs,
  bandTypeDefs,
  genreTypeDefs,
  trackTypeDefs,
  userTypeDefs,
  favoriteTypeDefs,
  sharedTypeDefs,
]);
