

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}





interface Genre {
  _id: string;
  name: string;
  description: string;
  country: string;
  year: string;
}

interface Pagination {
  limit: number;
  offset: number;
}

interface Del {
  acknowledged: boolean;
  deletedCount: number;
}

export { User, Genre, Pagination, Del }; 