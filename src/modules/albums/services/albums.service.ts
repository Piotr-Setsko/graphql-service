import { Context } from '@apollo/client';
import { Del, Genre, Pagination } from '../../../interface';
import { renameKey } from '../../../utils/utils';
import { Artist } from '../../artists/artist.interface';
import { Band } from '../../bands/band.interface';
import { Track } from '../../tracks/track.interface';
import { Album } from '../album.interface';

export const albumResolvers = {
  Query: {
    album: async(_: string, {id}: {id: string}, { dataSources }: Context): Promise<Album> => {
      const album = await dataSources.albumAPI.getAlbum(id);

      return renameKey(album);
    },

    albums: async (_: string, { limit, offset }: Pagination, { dataSources }: Context): Promise<Album> => {
      const albums = await dataSources.albumAPI.getAlbumsAll(limit, offset);

      return renameKey(albums.items);
    },
  },

  Mutation: {
    createAlbum: async (_: string, { input }: { input: Album }, { dataSources }: Context): Promise<Album> => {
      const album = await dataSources.albumAPI.createAlbum({ ...input });

      return renameKey(album);
    },

    updateAlbum: async (_: string, args: { id: string, input: Album }, { dataSources }: Context): Promise<Album> => {
      const album = await dataSources.albumAPI.updateAlbum(args.id, { ...args.input });

      return renameKey(album);
    },

    deleteAlbum: async (_: string, { id }: { id: string }, { dataSources }: Context): Promise<Del> => {
      const result = await dataSources.albumAPI.deleteAlbum(id);

      return result;
    }
  },

  Album: {
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

    tracks: async ({ trackIds }: { trackIds: [string] }, _: string, { dataSources }: Context): Promise<[Track]> => {
      const tracks = await Promise.all(trackIds.map(async (id) => await dataSources.trackAPI.getTrack(id)));

      return renameKey(tracks);
    },
  }
}