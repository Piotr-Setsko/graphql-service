import { renameKey } from './utils/utils';
import { mergeResolvers } from '@graphql-tools/merge';
import { trackResolvers } from './modules/tracks/service/tracks.service';
import { favoriteResolvers } from './modules/favorites/services/favorites.service';
import { aristResolvers } from './modules/artists/services/artists.service';
import { albumResolvers } from './modules/albums/services/albums.service';
import { bandResolvers } from './modules/bands/services/band.services';
import { genreResolvers } from './modules/genres/services/genres.service';

const resolversAll = {
  Query: {
    user: async (_: string, { id }: { id: string }, { dataSources }: {
      dataSources: any;
    }): Promise<any> => {
      const user = await dataSources.userAPI.getUser(id);

      return renameKey(user);
    },
  },

  

 

  Mutation: {
    register: async (_: string, args: { firstName: string, secondName: string, password: string, email: string }, { dataSources }: {
      dataSources: any;
    }): Promise<any> => {
      const { firstName, secondName, password, email } = args;
      const newUser = await dataSources.userAPI.registerUser({ firstName, lastName: secondName, password, email })

      return {
        id: newUser._id,
        firstName,
        secondName: newUser.lastName,
        password: newUser.password,
        email
      }
    },

    login: async (_: string, args: { password: string, email: string }, { dataSources }: {
      dataSources: any;
    }): Promise<any> => {
      const { email, password } = args;
      const jwt = await dataSources.userAPI.loginUser({ email, password });

      return {
        jwt: jwt.jwt
      }
    },

    
  }
}

export const resolvers = mergeResolvers([albumResolvers, aristResolvers, bandResolvers, genreResolvers, resolversAll, trackResolvers, favoriteResolvers, ]);
