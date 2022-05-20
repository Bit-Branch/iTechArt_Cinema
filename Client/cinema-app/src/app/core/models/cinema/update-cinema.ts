import { Hall } from '@core/models/hall/hall';
import { UpdateCinemaFavor } from '@core/models/cinema-favor/update-cinema-favor';

export interface UpdateCinema {
  id: number,
  name: string,
  address: string,
  cityId: number,
  halls: Hall[],
  cinemaFavors: UpdateCinemaFavor[]
}
