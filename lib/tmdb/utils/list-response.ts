export type ListResponse<T> = {
  page: number;
  results: T[];
  totalResults: number;
  totalPages: number;
};
