import { Context } from '@apollo/client';
import { renameKey } from '../../../utils/utils';
import { User, UserOutput } from '../user.interface';

export const userResolvers = {
  Query: {
    user: async (_: string, { id }: { id: string }, { dataSources }: Context): Promise<User> => {
      const user = await dataSources.userAPI.getUser(id);

      return renameKey(user);
    },
  },

  Mutation: {
    register: async (_: string, args: UserOutput, { dataSources }: Context): Promise<UserOutput> => {
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

    login: async (_: string, args: { password: string, email: string }, { dataSources }: Context): Promise<{jwt: string}> => {
      const { email, password } = args;
      const jwt = await dataSources.userAPI.loginUser({ email, password });

      return {
        jwt: jwt.jwt
      }
    },
  }
}