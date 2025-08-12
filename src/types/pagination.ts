export interface IPaginationMeta {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  perPage: number;
}

export interface IPaginatedResponse<T> {
  data: T[];
  pagination: IPaginationMeta;
}
