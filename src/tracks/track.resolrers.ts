import { Context } from '@apollo/client';
import { Artist, Del, Genre, Pagination } from '../interface';
import { renameKey } from '../utils/utils';
import { Track } from './track.interface';

export const trackResolvers = {
  Query: {
    track: async (_: string, { id }: { id: string }, { dataSources }: { dataSources: Context }): Promise<Track> => {
      const track = await dataSources.trackAPI.getTrack(id);

      return {
        ...track,
        id: track._id,
        album: track.albumId
      };
    },
    tracksAll: async (_: string, { limit, offset }: Pagination, { dataSources }: { dataSources: Context }): Promise<[Track]> => {
      const tracks = await dataSources.trackAPI.getTracksAll(limit, offset);

      return renameKey(tracks.items);
    }
  },

  Mutation: {
    createTrack: async (_: string, { input }: { input: Track }, { dataSources }: Context): Promise<Track> => {
      const track = await dataSources.trackAPI.createTrack({ ...input });

      return {
        ...track,
        id: track._id,
        album: track.albumId
      };
    },

    changeTrack: async (_: string, args: {id: string, input: Track },  { dataSources }: Context): Promise<Track> => {
      const track = await dataSources.trackAPI.changeTrack(args.id, {...args.input});

      return {
        ...track,
        id: track._id,
        album: track.albumId
      };
    },

    deleteTrack: async (_: string, {id}: {id: string}, { dataSources }: Context): Promise<Del> => {
      const result = await dataSources.trackAPI.deleteTrack(id);

      return result;
    }
  },

  Track: {
    bands: async ({ bandsIds }: { bandsIds: [string] }, _: string, { dataSources }: { dataSources: any }): Promise<any> => {
      const bands = await Promise.all(bandsIds.map(async (id) => await dataSources.bandAPI.getBand(id)));

      return renameKey(bands);
    },

    artists: async ({ artistsIds }: { artistsIds: [string] }, _: string, { dataSources }: Context): Promise<Artist> => {
      const artists = await Promise.all(artistsIds.map(async (id) => await dataSources.artistAPI.getArtist(id)));

      return renameKey(artists);
    },

    genres: async ({ genresIds }: { genresIds: [string] }, _: string, { dataSources }: Context): Promise<Genre> => {
      const genres = await Promise.all(genresIds.map(async (id) => await dataSources.genreAPI.getGenre(id)));

      return renameKey(genres);
    }
  }
}