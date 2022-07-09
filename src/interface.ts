

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}







interface Pagination {
  limit: number;
  offset: number;
}

interface Del {
  acknowledged: boolean;
  deletedCount: number;
}

export { User, Pagination, Del }; 