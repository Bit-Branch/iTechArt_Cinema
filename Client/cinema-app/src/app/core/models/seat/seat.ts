import { Hall } from '@core/models/hall/hall';
import { SeatType } from '@core/models/seat-type/seat-type';

export interface Seat {
  id: number,
  rowName: string,
  seatNo: number,
  hall?: Hall,
  seatType?: SeatType
}
