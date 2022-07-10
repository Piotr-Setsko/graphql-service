import { gql } from 'apollo-server';

export const bandTypeDefs = gql`
  type Query {
    band(id: ID!): Band!

    bands(limit: Int, offset: Int): [Band]!
  }

  type Mutation {
    createBand(input: BandCreate): Band!

    updateBand(id: ID!, input: BandInput): Band!

    deleteBand(id: ID!): DEL
  }

  type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  input BandInput {
    name: String
    origin: String
    members: [MemberInput]
    website: String
    genres: [String]
  }

  input BandCreate {
    name: String!
    origin: String
    members: [MemberInput]
    website: String
    genres: [String]
  }

  input MemberInput {
    id: String
    instrument: String
    years: [String]
  }

  type Member {
    id: ID!
    firstName: String
    secondName: String
    instrument: String
    years: [String]
  }
`