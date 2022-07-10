import { mergeResolvers } from '@graphql-tools/merge';
import { trackResolvers } from './modules/tracks/service/tracks.service';
import { favoriteResolvers } from './modules/favorites/services/favorites.service';
import { aristResolvers } from './modules/artists/services/artists.service';
import { albumResolvers } from './modules/albums/services/albums.service';
import { bandResolvers } from './modules/bands/services/band.services';
import { genreResolvers } from './modules/genres/services/genres.service';
import { userResolvers } from './modules/users/services/user.service';

export const resolvers = mergeResolvers([albumResolvers, aristResolvers, bandResolvers, genreResolvers, trackResolvers, userResolvers, favoriteResolvers]);
