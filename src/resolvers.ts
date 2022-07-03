export const resolvers = {
  Query: {
    user: async (_: string, { id }: { id: string }, { dataSources }: {
      dataSources: any;
    }): Promise<any> => {
      return dataSources.userAPI.getUser(id);
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
      dataSources: any;}): Promise<any> => {
      const { email, password } = args;
      const jwt = await dataSources.userAPI.loginUser({email, password});
      return {
        jwt: jwt.jwt
      }
    }
  }
}