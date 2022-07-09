import { gql } from 'apollo-server';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { trackTypeDefs } from './modules/tracks/schemas/track.schema';
import { favoriteTypeDefs } from './modules/favorites/schemas/favorite.schema';
import { artistTypeDefs } from './modules/artists/schemas/artist.schema';
import { albumTypeDefs } from './modules/albums/schemas/album.schema';
import { bandTypeDefs } from './modules/bands/schemas/band.schema';

const allTypeDefs = gql`
  type Query {
    user(id: ID!): User

    genre(id: ID!): Genre

    genresAll: [Genre]!


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

  
  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
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

  

  type DEL {
    acknowledged: Boolean
    deletedCount: Int
  }
`;

export const typeDefs = mergeTypeDefs([albumTypeDefs, artistTypeDefs, bandTypeDefs, allTypeDefs, trackTypeDefs, favoriteTypeDefs,]);
