import { CinemaFavor } from '@core/models/cinema-favor/cinema-favor';
import { CreateHall } from '@core/models/hall/create-hall';

export interface Cinema {
  id: number,
  name: string,
  address: string,
  cityId: number,
  halls: CreateHall[],
  cinemaFavors: CinemaFavor[]
}
