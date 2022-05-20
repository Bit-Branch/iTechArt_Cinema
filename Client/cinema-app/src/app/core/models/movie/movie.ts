import { Genre } from '@core/models/genre/genre';
import { Image } from '@core/models/image/image';

export interface Movie {
  id: number
  title: string,
  description: string,
  genre: Genre,
  yearOfIssue: number,
  image: Image,
  showInCinemasStartDate: Date,
  showInCinemasEndDate: Date,
  durationInMinutes: number
}
