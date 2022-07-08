import { gql } from 'apollo-server';

export const trackTypeDefs = gql`
  type Query {
    track(id: ID!): Track!

    tracksAll(limit: Int, offset: Int): [Track]!
  }

  type Mutation {
    createTrack(input: TrackInput): Track!

    changeTrack(id: ID!, input: TrackInput): Track!

    deleteTrack(id: ID!): DEL
  }

  input TrackInput {
    title: String!
    albumId: String
    artists: [String]
    bandsIds: [String]
    duration: Int
    released: Int
    genresIds: [String]
  }

  type Track {
    id: ID!
    title: String
    album: String
    artists: [Artist]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }
`