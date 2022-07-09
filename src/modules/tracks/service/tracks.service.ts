import { Context } from '@apollo/client';
import { renameKey } from '../../../utils/utils';
import { Del, Genre, Pagination } from '../../../interface';
import { Track } from '../track.interface';
import { Artist } from '../../artists/artist.interface';
import { Band } from '../../bands/band.interface';

export const trackResolvers = {
  Query: {
    track: async (_: string, { id }: { id: string }, { dataSources }: Context): Promise<Track> => {
      const track = await dataSources.trackAPI.getTrack(id);

      return renameKey(track)
    },

    tracks: async (_: string, { limit, offset }: Pagination, { dataSources }: Context): Promise<[Track]> => {
      const tracks = await dataSources.trackAPI.getTracksAll(limit, offset);

      return renameKey(tracks.items);
    }
  },

  Mutation: {
    createTrack: async (_: string, { input }: { input: Track }, { dataSources }: Context): Promise<Track> => {
      const track = await dataSources.trackAPI.createTrack({ ...input });

      return renameKey(track);
    },

    updateTrack: async (_: string, args: { id: string, input: Track }, { dataSources }: Context): Promise<Track> => {
      const track = await dataSources.trackAPI.changeTrack(args.id, { ...args.input });

      return renameKey(track);
    },

    deleteTrack: async (_: string, { id }: { id: string }, { dataSources }: Context): Promise<Del> => {
      const result = await dataSources.trackAPI.deleteTrack(id);

      return result;
    }
  },

  Track: {
    album: async ({ albumId }: { albumId: string }, _: string, { dataSources }: Context): Promise<Artist> => {
      const album = await dataSources.albumAPI.getAlbum(albumId);

      return renameKey(album);
    },

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
    }
  }
}