import { CinemaFavor } from '@core/models/cinema-favor/cinema-favor';
import { City } from '@core/models/city/city';
import { Hall } from '@core/models/hall/hall';

export interface Cinema {
  id: number,
  name: string,
  address: string,
  city: City,
  halls: Hall[],
  cinemaFavors: CinemaFavor[]
}
