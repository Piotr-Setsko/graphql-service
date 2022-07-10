import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  type Query {
    user(id: ID!): User!
  }

  type Mutation {
    register(
      input: registerUser
    ): User!

    login(email: String!, password: String!): jwt!
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

  input registerUser {
    firstName: String!
    secondName: String!
    password: String!
    email: String!
  }
`