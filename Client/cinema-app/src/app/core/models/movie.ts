export interface Movie {
  id?: number
  title: string,
  cover: File,
  description: string,
  genreId: number,
  startDate: Date,
  endDate: Date,
  durationInMinutes: number
}
