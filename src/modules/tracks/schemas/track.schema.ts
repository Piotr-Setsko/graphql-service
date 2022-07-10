import { gql } from 'apollo-server';

export const trackTypeDefs = gql`
  type Query {
    track(id: ID!): Track!

    tracks(limit: Int, offset: Int): [Track]!
  }

  type Mutation {
    createTrack(input: TrackCreate): Track!

    updateTrack(id: ID!, input: TrackInput): Track!

    deleteTrack(id: ID!): DEL
  }

  input TrackInput {
    title: String
    albumId: String
    artistsIds: [String]
    bandsIds: [String]
    duration: Int
    released: Int
    genresIds: [String]
  }

  input TrackCreate {
    title: String!
    albumId: String
    artistsIds: [String]
    bandsIds: [String]
    duration: Int
    released: Int
    genresIds: [String]
  }

  type Track {
    id: ID!
    title: String!
    album: Album
    artists: [Artist]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }
`