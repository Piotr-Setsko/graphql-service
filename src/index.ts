import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { ApolloServer } from 'apollo-server';
import allTypeDefs from './schema';
import { resolversAll } from './resolvers';
import { UserAPI } from './datasources/user';
import { AlbumAPI } from './datasources/albums';
import { GenreAPI } from './datasources/genre';
import { ArtistAPI } from './datasources/artists';
import { BandAPI } from './datasources/bands';
import { TrackAPI } from './tracks/tracksAPI';
import { trackResolvers } from './tracks/track.resolrers';
import { trackTypeDefs } from './tracks/track.shema';

const resolvers = mergeResolvers([resolversAll, trackResolvers]) as any;
const typeDefs = mergeTypeDefs([allTypeDefs, trackTypeDefs]) as any;

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
      trackAPI: new TrackAPI()
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
