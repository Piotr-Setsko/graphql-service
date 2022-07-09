import { Context } from '@apollo/client';
import { renameKey } from '../../../utils/utils';
import { Band, Del, Pagination } from '../../../interface';
import { Artist } from '../artist.interface';

export const aristResolvers = {
  Query: {
    artist: async(_: string, {id}:{id: string}, { dataSources }: Context): Promise<Artist> => {
      const artist = await dataSources.artistAPI.getArtist(id);

      return renameKey(artist);
    },

    artists: async (_: string, { limit, offset }: Pagination, { dataSources }: Context): Promise<[Artist]> => {
      const artists = await dataSources.artistAPI.getArtistsAll(limit, offset);

      return renameKey(artists.items)
    },
  },

  Mutation: {
    createArtist: async (_: string, { input }: { input: Artist }, { dataSources }: Context): Promise<Artist> => {
      const artist = await dataSources.artistAPI.createArtist({ ...input });

      return renameKey(artist);
    },

    updateArtist: async (_: string, args: { id: string, input: Artist }, { dataSources }: Context): Promise<Artist> => {
      const artist = await dataSources.artistAPI.changeTrack(args.id, { ...args.input });

      return renameKey(artist);
    },

    deleteArtist: async (_: string, { id }: { id: string }, { dataSources }: Context): Promise<Del> => {
      const result = await dataSources.artistAPI.deleteArtist(id);

      return result;
    }
  },

  Artist: {
    bands: async ({ bandsIds }: { bandsIds: [string] }, _: string, { dataSources }: Context): Promise<[Band]> => {
      const bands = await Promise.all(bandsIds.map(async (id) => await dataSources.bandAPI.getBand(id)));

      return renameKey(bands);
    }
  },
}