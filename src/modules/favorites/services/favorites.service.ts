import { Context } from '@apollo/client';
import { renameKey } from '../../../utils/utils';
import { Favorite } from '../favorite.interface';

export const favoriteResolvers = {
  Query: {
    favourites: async (_: string, __: string, { dataSources }: Context): Promise<any> => {
      const favorites = await dataSources.favoriteAPI.getFavouritesAll();

      return renameKey(favorites);
    }
  },
  Mutation: {
    addTrackToFavourites: async (_: string, { input }: { input: Favorite }, { dataSources }: Context): Promise<any> => {
      const favorite = await dataSources.favoriteAPI.addTrackToFavourites(input);

      return renameKey(favorite);
    }
  }
}