import { gql } from 'apollo-server';

const typeDefs = gql`
  type Query {
    user(id: ID!): User
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

  # type Artist {
  #   id: ID!
  #   firstName: String
  #   secondName: String
  #   middleName: String
  #   birthDate: String
  #   birthPlace: String
  #   country: String
  #   bands: [ID]
  #   instruments: String
  # }
  # type Band {
  #   id: ID!
  #   name: String
  #   origin: String
  #   membersId: Member[];
  #   website: String
  #   genres: String
  # }
  # type Genre {
  #   id: ID!
  #   name: String
  #   description: String
  #   country: String
  #   year: Int
  # }
  # type Favourites {
  #   id: ID!
  #   userId: ID!
  #   bands: [ID]
  #   genres: [ID]
  #   artists: [ID]
  #   tracks: [ID]
  # }
  # type Album {
  #   id: ID
  #   name: String
  #   released: Int
  #   artists: [Artist]
  #   bands: [Band]
  #   tracks: [Track]
  #   genres: [Genre]
  #   image: String
  # }
  
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

  # type Track {
  #   id: ID!
  #   title: String
  #   albums: String
  #   bands: [Band]
  #   duration: Int
  #   released: Int
  #   genres: [Genre]
  # }
  # type Member {
  #   artist: string,
  #   instrument: string,
  #   years: string[],
  # }
`;

export default typeDefs;
