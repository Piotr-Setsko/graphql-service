import { ApolloServer } from 'apollo-server';
import { resolvers } from './resolvers';
import { typeDefs } from './schema';
import { UserAPI } from './datasources/user';
import { AlbumAPI } from './datasources/albums';
import { GenreAPI } from './datasources/genre';
import { ArtistAPI } from './modules/artists/artists.controller';
import { BandAPI } from './datasources/bands';
import { TrackAPI } from './modules/tracks/track.controller';
import { FavoriteAPI } from './modules/favorites/favorite.controller';

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
    return { token };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
