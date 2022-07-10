interface Pagination {
  limit: number;
  offset: number;
}

interface Del {
  acknowledged: boolean;
  deletedCount: number;
}

export { Pagination, Del }; 