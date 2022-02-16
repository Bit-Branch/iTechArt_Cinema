export interface Movie {
  id?: number
  title: string,
  description: string,
  genreId: number,
  imageId: number,
  startDate: Date,
  endDate: Date,
  durationInMinutes: number
}
