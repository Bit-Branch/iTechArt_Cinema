import { CinemaFavor } from '@core/models/cinema-favor';
import { Hall } from '@core/models/hall';

export interface Cinema {
  id?: number,
  name: string,
  address: string,
  cityId: number,
  halls: Hall[],
  cinemaFavors: CinemaFavor[]
}
