import { Context } from '@apollo/client';
import { Pagination } from '../../../interface';
import { renameKey } from '../../../utils/utils';
import { Genre } from '../genre.interface';

export const genreResolvers = {
  Query: {
    genre: async (_: string, { id }: { id: string }, { dataSources }: Context): Promise<Genre> => {
      const genre = await dataSources.genreAPI.getGenre(id);

      return renameKey(genre);
    },

    genres: async (_: string, { limit, offset }: Pagination, { dataSources }: Context): Promise<[Genre]> => {
      const genres = await dataSources.genreAPI.getGenresAll(limit, offset);

      return renameKey(genres.items);
    },
  },

  Mutation: {
    createGenre: async (_: string, { input }: { input: Genre }, { dataSources }: Context): Promise<Genre> => {
      const newGenre = await dataSources.genreAPI.createGenre({ ...input });

      return renameKey(newGenre);
    },

    updateGenre: async (_: string, args: { id: string, input: Genre}, { dataSources }: Context): Promise<Genre> => {
      const genre = await dataSources.genreAPI.changeGenre(args.id, { ...args.input });

      return renameKey(genre)
    },

    deleteGenre: async (_: string, { id }: { id: string }, { dataSources }: Context): Promise<Genre> => {
      const result = await dataSources.genreAPI.deleteGenre(id);

      return result;
    },
  }
}