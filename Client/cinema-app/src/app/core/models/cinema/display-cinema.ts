import { City } from '@core/models/city/city';

export interface DisplayCinema {
  id: number,
  name: string,
  address: string,
  city: City
}
