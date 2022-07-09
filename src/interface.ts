

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



interface Pagination {
  limit: number,
  offset: number
}

interface Del {
  acknowledged: boolean,
  deletedCount: number
}

export { Album, User, Genre, Band, Pagination, Del }; 