import { renameKey } from './utils/utils';

export const resolvers = {
  Query: {
    user: async (_: string, { id }: { id: string }, { dataSources }: {
      dataSources: any;
    }): Promise<any> => {
      const user = await dataSources.userAPI.getUser(id);

      return renameKey(user);
    },

    band: async (_: string, { id }: { id: string }, { dataSources }: {
      dataSources: any;
    }): Promise<any> => {
      const band = await dataSources.bandAPI.getBand(id);

      return renameKey(band);
    },

    bandsAll: async (_: string, __: string, { dataSources }: {
      dataSources: any;
    }): Promise<any> => {
      const bands = await dataSources.bandAPI.getBandAll();

      return renameKey(bands.items);
    },

    albumsAll: async(_: string, __: string, { dataSources }: {
      dataSources: any;
    }): Promise<any> => {
      const albums = await dataSources.albumAPI.getAlbumsAll();

      return renameKey(albums.items);
    },

    genresAll: async (_: string, __: string, { dataSources }: {
      dataSources: any;
    }): Promise<any> => {
      const genres = await dataSources.genreAPI.getGenresAll();

      return renameKey(genres.items);
    },

    artistsAll: async (_: string, __: string, { dataSources }: { dataSources: any }): Promise<any> => {
      const artists = await dataSources.artistAPI.getArtistsAll();

      return renameKey(artists.items)
    }
  },

  Band: {
    members: async ({members}: {members: any}, _:string, { dataSources }: { dataSources: any }): Promise<any> => {
      const artists = await Promise.all(members.map(async ({id}:{id: string}) => await dataSources.artistAPI.getMember(id)));
      const membersData = artists.map((item, i) => {
        return ({
          id: item._id,
          firstName: item.firstName,
          secondName: item.secondName,
          instrument: members[i].instrument,
          years: members[i].years
        })
      });

      return membersData;
    }
  },

  Artist: {
    bands: async ({ bandsIds }: { bandsIds: [string] }, _: string, { dataSources }: { dataSources: any }): Promise<any> => {
      const bands = await Promise.all(bandsIds.map(async (id) => await dataSources.bandAPI.getBand(id)));
      
      return renameKey(bands);
    }
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
    }
  }
}