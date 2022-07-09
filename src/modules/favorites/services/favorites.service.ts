import { Context } from '@apollo/client';
import { renameKey } from '../../../utils/utils';
import { Artist } from '../../artists/artist.interface';
import { Band } from '../../bands/band.interface';
import { Genre } from '../../genres/genre.interface';
import { Track } from '../../tracks/track.interface';
import { Favourite, FavouriteInput } from '../favorite.interface';

export const favoriteResolvers = {
  Query: {
    favourites: async (_: string, __: string, { dataSources }: Context): Promise<[Favourite]> => {
      const favorites = await dataSources.favoriteAPI.getFavouritesAll();

      return renameKey(favorites);
    }
  },
  Mutation: {
    addTrackToFavourites: async (_: string, { input }: { input: FavouriteInput }, { dataSources }: Context): Promise<Favourite> => {
      input.type = "tracks";
      const favorite = await dataSources.favoriteAPI.addTrackToFavourites(input);

      return renameKey(favorite);
    },

    addBandToFavourites: async (_: string, { input }: { input: FavouriteInput }, { dataSources }: Context): Promise<Favourite> => {
      input.type = "bands";
      const favorite = await dataSources.favoriteAPI.addBandToFavourites(input);

      return renameKey(favorite);
    },

    addArtistToFavourites: async (_: string, { input }: { input: FavouriteInput }, { dataSources }: Context): Promise<Favourite> => {
      input.type = "artists";
      const favorite = await dataSources.favoriteAPI.addArtistToFavourites(input);

      return renameKey(favorite);
    },

    addGenreToFavourites: async (_: string, { input }: { input: FavouriteInput }, { dataSources }: Context): Promise<Favourite> => {
      input.type = "genres";
      const favorite = await dataSources.favoriteAPI.addGenreToFavourites(input);

      return renameKey(favorite);
    },

    removeTrackFromFavourites: async (_: string, { input }: { input: FavouriteInput }, { dataSources }: Context): Promise<Favourite> => {
      input.type = "tracks";
      const favorite = await dataSources.favoriteAPI.removeTrackFromFavourites(input);

      return renameKey(favorite);
    },
  },

  Favourites: {
    bands: async ({ bandsIds }: { bandsIds: [string] }, _: string, { dataSources }: Context): Promise<[Band]> => {
      const bands = await Promise.all(bandsIds.map(async (id) => await dataSources.bandAPI.getBand(id)));

      return renameKey(bands);
    },

    artists: async ({ artistsIds }: { artistsIds: [string] }, _: string, { dataSources }: Context): Promise<[Artist]> => {
      const artists = await Promise.all(artistsIds.map(async (id) => await dataSources.artistAPI.getArtist(id)));

      return renameKey(artists);
    },

    genres: async ({ genresIds }: { genresIds: [string] }, _: string, { dataSources }: Context): Promise<[Genre]> => {
      const genres = await Promise.all(genresIds.map(async (id) => await dataSources.genreAPI.getGenre(id)));

      return renameKey(genres);
    },

    tracks: async ({ tracksIds }: { tracksIds: [string] }, _: string, { dataSources }: Context): Promise<[Track]> => {
      const tracks = await Promise.all(tracksIds.map(async (id) => await dataSources.trackAPI.getTrack(id)));

      return renameKey(tracks);
    },
  }
}