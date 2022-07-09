import { Context } from '@apollo/client';
import { mergeResolvers } from '@graphql-tools/merge';
import { renameKey } from './utils/utils';
import { trackResolvers } from './modules/tracks/service/tracks.service';
import { favoriteResolvers } from './modules/favorites/services/favorites.service';
import { aristResolvers } from './modules/artists/services/artists.service';
import { Album} from './interface';

const resolversAll = {
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

    album: async(_: string, {id}: {id: string}, { dataSources }: Context): Promise<Album> => {
      const album = await dataSources.albumAPI.getAlbum(id);

      return renameKey(album);
    },

    albumsAll: async (_: string, __: string, { dataSources }: {
      dataSources: any;
    }): Promise<any> => {
      const albums = await dataSources.albumAPI.getAlbumsAll();

      return renameKey(albums.items);
    },

    genre: async (_: string, { id }: { id: string }, { dataSources }: {
      dataSources: Context;
    }): Promise<any> => {
      const genre = await dataSources.genreAPI.getGenre(id);

      return renameKey(genre);
    },

    genresAll: async (_: string, __: string, { dataSources }: {
      dataSources: any;
    }): Promise<any> => {
      const genres = await dataSources.genreAPI.getGenresAll();

      return renameKey(genres.items);
    },
  },

  Band: {
    members: async ({ members }: { members: any }, _: string, { dataSources }: { dataSources: any }): Promise<any> => {
      const artists = await Promise.all(members.map(async ({ id }: { id: string }) => await dataSources.artistAPI.getMember(id)));
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

    createGenre: async (_: string, args: { input: { name: string, description: string, country: string, year: number } }, { dataSources }: {
      dataSources: any;
    }): Promise<any> => {
      const newGenre = await dataSources.genreAPI.createGenre({ ...args.input });

      return renameKey(newGenre);
    },

    changeGenre: async (_: string, args: { id: string, input: { name: string, description: string, country: string, year: number } }, { dataSources }: { dataSources: Context }): Promise<any> => {
      const genre = await dataSources.genreAPI.changeGenre(args.id, { ...args.input });

      return renameKey(genre)
    },

    deleteGenre: async (_: string, { id }: { id: string }, { dataSources }: { dataSources: Context }): Promise<any> => {
      const result = await dataSources.genreAPI.deleteGenre(id);

      return result;
    },
  }
}

export const resolvers = mergeResolvers([resolversAll, trackResolvers, favoriteResolvers, aristResolvers]);
