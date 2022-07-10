import { gql } from 'apollo-server';

export const genreTypeDefs = gql`
  type Query {
    genre(id: ID!): Genre

    genres(limit: Int, offset: Int): [Genre]!
  }

  type Mutation {
    createGenre(input: GenreCreate): Genre!

    updateGenre(id: ID!, input: GenreInput): Genre!

    deleteGenre(id: ID!): DEL
  }

  input GenreInput {
    name: String
    description: String
    country: String
    year: Int
  }

  input GenreCreate {
    name: String!
    description: String
    country: String
    year: Int
  }

  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }
`;
