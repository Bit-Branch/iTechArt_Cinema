export interface TableCurrentState {
  pageIndex: number,
  pageSize: number,
  ascending: boolean,
  sortingColumn?: string,
  searchTerm?: string
}
