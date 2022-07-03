interface Artist {
  _id: string;
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  bandsIds: string[]
  instruments: string[];
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

interface Band {
  _id: string;
  name: string;
  origin: string;
  membersId: Member[];
  website: string;
  genresIds: string[];
}

interface Member {
  artist: string,
  instrument: string,
  years: string[],
}

interface Genre {
  _id: string;
  name: string;
  description: string;
  country: string;
  year: string;
}

interface Track {
  _id: string;
  title: string;
  albumId: string;
  bandsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
}

interface Album {
  _id: string;
  name: string;
  released: number;
  artistsIds: string[];
  bandsIds: string[];
  trackIds: string[];
  genresIds: string[];
  image: string;
}

interface Favorite {
  _id: string;
  userId: string;
  bandsIds: string[];
  genresIds: string[];
  artistsIds: string[];
  tracksIds: string[];
}

export { User };