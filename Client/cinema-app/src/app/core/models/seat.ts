import { Hall } from '@core/models/hall';
import { SeatType } from '@core/models/seat-type';

export interface Seat {
  id?: number,
  hall?: Hall,
  seatType?: SeatType
}
