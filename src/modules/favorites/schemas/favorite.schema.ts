import { gql } from 'apollo-server';

export const favoriteTypeDefs = gql`
  type Query {
    favourites: Favourites
  }

  type Mutation {
    addTrackToFavourites(input: FavouritesInput): Favourites!

    addBandToFavourites(input: FavouritesInput): Favourites!

    addArtistToFavourites(input: FavouritesInput): Favourites!

    addGenreToFavourites(input: FavouritesInput): Favourites!

    removeTrackFromFavourites(input: FavouritesInput): Favourites

    removeBandFromFavourites(input: FavouritesInput): Favourites

    removeArtistFromFavourites(input: FavouritesInput): Favourites

    removeGenreFromFavourites(input: FavouritesInput): Favourites
  }

  type Favourites {
    id: ID!
    userId: ID!
    bands: [Band]
    genres: [Genre]
    artists: [Artist]
    tracks: [Track]
  }

  input FavouritesInput {
    id: ID!
  }
`