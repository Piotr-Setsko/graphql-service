import { mergeTypeDefs } from '@graphql-tools/merge';
import { gql } from 'apollo-server';
import { trackTypeDefs } from './modules/tracks/schemas/track.schema';
import { favoriteTypeDefs } from './modules/favorites/schemas/favorite.schema';
import { artistTypeDefs } from './modules/artists/schemas/artist.schema';

const allTypeDefs = gql`
  type Query {
    user(id: ID!): User

    band(id: ID!): Band

    bandsAll: [Band]!

    album(id: ID!): Album!

    albumsAll: [Album]!

    genre(id: ID!): Genre

    genresAll: [Genre]!


  }

  type Band {
    members: [Member]
  }

  type Mutation {
    register(
      firstName: String!
      secondName: String!
      password: String!
      email: String!
    ): User

    createGenre(input: GenreInput): Genre!

    changeGenre(id: ID!, input: GenreInput): Genre!

    deleteGenre(id: ID!): DEL

    login(email: String!, password: String!): jwt
  }

  input GenreInput {
    name: String
    description: String
    country: String
    year: Int
  }

  type jwt {
    jwt: String!
  }

 

  type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
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

  type User {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    password: String
    email: String!
  }

  type registerUser {
    firstName: String!
    secondName: String!
    password: String!
    email: String!
  }

  type Member {
    id: ID!
    firstName: String
    secondName: String
    instrument: String
    years: [String]
  }

  type DEL {
    acknowledged: Boolean
    deletedCount: Int
  }
`;

export const typeDefs = mergeTypeDefs([allTypeDefs, trackTypeDefs, favoriteTypeDefs, artistTypeDefs]);
