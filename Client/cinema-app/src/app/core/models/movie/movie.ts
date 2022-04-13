import { Genre } from '@core/models/genre/genre';

export interface Movie {
  id: number
  title: string,
  description: string,
  genre: Genre,
  imageId: number,
  showInCinemasStartDate: Date,
  showInCinemasEndDate: Date,
  durationInMinutes: number
}
