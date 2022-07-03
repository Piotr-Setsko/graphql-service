import { ApolloServer } from 'apollo-server';
import typeDefs from './schema';
import { resolvers } from './resolvers';
import { UserAPI } from './user';
import { PersonalizationAPI } from './persona';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: 'bounded',

  dataSources: () => {
    return {
      userAPI: new UserAPI(),
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
