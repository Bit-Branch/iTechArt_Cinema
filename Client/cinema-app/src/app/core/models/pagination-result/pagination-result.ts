export interface PaginationResult<T> {
  totalCountInDatabase: number,
  items: T[]
}
