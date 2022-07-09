import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { ApolloServer } from 'apollo-server';
import allTypeDefs from './schema';
import { resolversAll } from './resolvers';
import { UserAPI } from './datasources/user';
import { AlbumAPI } from './datasources/albums';
import { GenreAPI } from './datasources/genre';
import { ArtistAPI } from './modules/artists/artists.controller';
import { BandAPI } from './datasources/bands';
import { TrackAPI } from './modules/tracks/track.controller';
import { trackResolvers } from './modules/tracks/service/tracks.service';
import { trackTypeDefs } from './modules/tracks/schemas/track.schema';
import { FavoriteAPI } from './modules/favorites/favorite.controller';
import { favoriteTypeDefs } from './modules/favorites/schemas/favorite.schema';
import { favoriteResolvers } from './modules/favorites/services/favorites.service';

const resolvers = mergeResolvers([resolversAll, trackResolvers, favoriteResolvers]);
const typeDefs = mergeTypeDefs([allTypeDefs, trackTypeDefs, favoriteTypeDefs]);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',

  dataSources: () => {
    return {
      userAPI: new UserAPI(),
      albumAPI: new AlbumAPI(),
      genreAPI: new GenreAPI(),
      artistAPI: new ArtistAPI(),
      bandAPI: new BandAPI(),
      trackAPI: new TrackAPI(),
      favoriteAPI: new FavoriteAPI()
    };
  },

  context: ({ req }) => {
    const token = req.headers.authorization || '';
    return {token};
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
