import { Hall } from '@core/models/hall/hall';
import { SeatType } from '@core/models/seat-type/seat-type';

export interface CreateSeat {
  rowName: string,
  seatNo: number,
  hall?: Hall,
  seatType?: SeatType
}
