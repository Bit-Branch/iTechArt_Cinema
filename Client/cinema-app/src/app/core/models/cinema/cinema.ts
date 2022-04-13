import { CinemaFavor } from '@core/models/cinema-favor/cinema-favor';
import { City } from '@core/models/city/city';
import { CreateHall } from '@core/models/hall/create-hall';

export interface Cinema {
  id: number,
  name: string,
  address: string,
  city: City,
  halls: CreateHall[],
  cinemaFavors: CinemaFavor[]
}
