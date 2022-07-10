import { gql } from 'apollo-server';

export const userTypeDefs = gql`
  type Query {
    user(id: ID!): User!

    jwt(input: loginUser): jwt!
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
    lastName: String
    password: String
    email: String!
  }

  input registerUser {
    firstName: String!
    lastName: String!
    password: String!
    email: String!
  }

  input loginUser {
    email: String!
    password: String!
  }
`