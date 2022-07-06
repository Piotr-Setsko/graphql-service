import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    user(id: ID!): User,

    band(id: ID!): Band,

    bandsAll: [Band]!,

    albumsAll: [Album]!,

    genresAll: [Genre]!,

    artistsAll: [Artist]! 
  }

  type Artist {
    bands: [Band]!,
  }

  type Band {
    members: [Member]
  }

  type Mutation {
    register(
      firstName: String!,
      secondName: String!,
      password: String!,
      email: String!
    ): User,

    login(email: String!, password: String!): jwt
  }

  type jwt {
    jwt: String!
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
  
  # type Favourites {
  #   id: ID!
  #   userId: ID!
  #   bands: [ID]
  #   genres: [ID]
  #   artists: [ID]
  #   tracks: [ID]
  # }

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

  type Track {
    id: ID!
    title: String
    albums: String
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  type Member {
    id: ID!
    firstName: String,
    secondName: String,
    instrument: String
    years: [String]
  }
`;

export default typeDefs;
