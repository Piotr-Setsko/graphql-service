import { Context } from '@apollo/client';
import { renameKey } from '../../../utils/utils';
import { User, UserLogin, UserOutput } from '../user.interface';

export const userResolvers = {
  Query: {
    user: async (_: string, { id }: { id: string }, { dataSources }: Context): Promise<User> => {
      const user = await dataSources.userAPI.getUser(id);

      return renameKey(user);
    },

    jwt: async (_: string, args: {input: UserLogin}, { dataSources }: Context): Promise<{jwt: string}> => {
      const { email, password } = args.input;
      const jwt = await dataSources.userAPI.loginUser({ email, password });

      return {
        jwt: jwt.jwt
      }
    }
  },

  Mutation: {
    register: async (_: string, args: {input: UserOutput}, { dataSources }: Context): Promise<UserOutput> => {
      const newUser = await dataSources.userAPI.registerUser(args.input);
      
      return renameKey(newUser);
    },

    // login: async (_: string, args: { password: string, email: string }, { dataSources }: Context): Promise<{jwt: string}> => {
    //   const { email, password } = args;
    //   const jwt = await dataSources.userAPI.loginUser({ email, password });

    //   return {
    //     jwt: jwt.jwt
    //   }
    // },
  }
}