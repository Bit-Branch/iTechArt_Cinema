export interface Movie {
  id?: number
  title: string,
  cover?: Uint8Array,
  description: string,
  genre: string,
  startDate: Date,
  endDate: Date,
  durationInMinutes: number
}
