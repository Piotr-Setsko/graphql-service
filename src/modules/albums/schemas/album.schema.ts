import { gql } from 'apollo-server';

export const albumTypeDefs = gql`
  type Query {
    album(id: ID!): Album!

    albums(limit: Int, offset: Int): [Album]!
  }

  type Mutation {
    createAlbum(input: AlbumInput): Album!

    updateAlbum(id: ID!, input: AlbumInput): Album!

    deleteAlbum(id: ID!): DEL
  }

  type Album {
    id: ID
    name: String
    released: Int
    artists: [Artist]
    bands: [Band]
    tracks: [Track]
    genres: [Genre]
    image: String
  }

  input AlbumInput {
    name: String
    released: Int
    artists: [String]
    bands: [String]
    tracks: [String]
    genres: [String]
    image: String
  }
`