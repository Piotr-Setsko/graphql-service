import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import { resolvers } from './resolvers';
import { UserAPI } from './datasources/user';
import { PersonalizationAPI } from './datasources/persona';
import { AlbumAPI } from './datasources/albums';
import { GenreAPI } from './datasources/genre';
import { ArtistAPI } from './datasources/artists';
import { BandAPI } from './datasources/bands';

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
      personalizationAPI: new PersonalizationAPI(),
    };
  },

  // context: ({ req }) => {

  //   const token = req.headers.authorization || '';
  //   console.log(token);
    
  //   return token;
  // },
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
