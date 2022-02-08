import { Seat } from '@core/models/seat';

export interface Hall {
  id?: number,
  name: string,
  seats: Seat[]
}
