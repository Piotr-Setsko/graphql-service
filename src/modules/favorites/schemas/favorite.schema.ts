import { gql } from 'apollo-server';

export const favoriteTypeDefs = gql`
  type Query {
    favourites: Favourites
  }

  type Mutation {
    addTrackToFavourites(input: FavouritesInput): Favourites
  }

  type Favourites {
    id: ID!
    userId: ID!
    bands: [ID]
    genres: [ID]
    artists: [ID]
    tracks: [ID]
  }

  input FavouritesInput {
    type: String!
    id: ID!
  }
`