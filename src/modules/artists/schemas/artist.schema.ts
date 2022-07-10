import { gql } from 'apollo-server';

export const artistTypeDefs = gql`
 type Query {
  artist(id: ID!): Artist!

  artists(limit: Int, offset: Int): [Artist]!
 }

 type Mutation {
    createArtist(input: ArtistCreate): Artist!

    updateArtist(id: ID!, input: ArtistInput): Artist!

    deleteArtist(id: ID!): DEL
  }


 type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [Band]
    instruments: [String]
  }

  input ArtistInput {
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [String]
    instruments: [String]
  }

  input ArtistCreate {
    firstName: String!
    secondName: String!
    middleName: String
    birthDate: String
    birthPlace: String
    country: String!
    bands: [String]
    instruments: [String]
  }
`