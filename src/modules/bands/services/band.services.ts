import { Context } from '@apollo/client';
import { Del, Pagination } from '../../../interface';
import { renameKey } from '../../../utils/utils';
import { Genre } from '../../genres/genre.interface';
import { Band, Member } from '../band.interface';

export const bandResolvers = {
  Query: {
    band: async (_: string, { id }: { id: string }, { dataSources }: Context): Promise<Band> => {
      const band = await dataSources.bandAPI.getBand(id);

      return renameKey(band);
    },

    bands: async (_: string, { limit, offset }: Pagination, { dataSources }: Context): Promise<[Band]> => {
      const bands = await dataSources.bandAPI.getBandAll(limit, offset);

      return renameKey(bands.items);
    },
  },

  Mutation: {
    createBand: async (_: string, { input }: { input: Band }, { dataSources }: Context): Promise<Band> => {
      const band = await dataSources.bandAPI.createBand({ ...input });

      return renameKey(band);
    },

    updateBand: async (_: string, args: { id: string, input: Band }, { dataSources }: Context): Promise<Band> => {
      const band = await dataSources.bandAPI.updateBand(args.id, { ...args.input });

      return renameKey(band);
    },

    deleteBand: async (_: string, { id }: { id: string }, { dataSources }: Context): Promise<Del> => {
      const result = await dataSources.bandAPI.deleteBand(id);

      return result;
    }
  },

  Band: {
    members: async ({ members }: { members: [Member] }, _: string, { dataSources }: Context): Promise<Member[]> => {
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
    },
    
    genres: async ({ genresIds }: { genresIds: [string] }, _: string, { dataSources }: Context): Promise<[Genre]> => {
      const genres = await Promise.all(genresIds.map(async (id) => await dataSources.genreAPI.getGenre(id)));

      return renameKey(genres);
    }
  },
}