import { CinemaFavor } from '@core/models/cinema-favor/cinema-favor';
import { CreateHall } from '@core/models/hall/create-hall';

export interface CreateCinema {
  name: string,
  address: string,
  cityId: number,
  halls: CreateHall[],
  cinemaFavors: CinemaFavor[]
}
