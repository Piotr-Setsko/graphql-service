import { gql } from 'apollo-server';
import { mergeTypeDefs } from '@graphql-tools/merge';
import { trackTypeDefs } from './modules/tracks/schemas/track.schema';
import { favoriteTypeDefs } from './modules/favorites/schemas/favorite.schema';
import { artistTypeDefs } from './modules/artists/schemas/artist.schema';
import { albumTypeDefs } from './modules/albums/schemas/album.schema';
import { bandTypeDefs } from './modules/bands/schemas/band.schema';
import { genreTypeDefs } from './modules/genres/schemas/genre.schema';

const allTypeDefs = gql`
  type Query {
    user(id: ID!): User
  }

  type Mutation {
    register(
      firstName: String!
      secondName: String!
      password: String!
      email: String!
    ): User

    login(email: String!, password: String!): jwt
  }

  type jwt {
    jwt: String!
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

export const typeDefs = mergeTypeDefs([
  albumTypeDefs,
  artistTypeDefs,
  bandTypeDefs,
  genreTypeDefs,
  allTypeDefs,
  trackTypeDefs,
  favoriteTypeDefs,
]);
