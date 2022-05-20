import { SeatType } from '@core/models/seat-type/seat-type';

export interface TicketPrice {
  movieSessionId: number,
  seatTypeId: number,
  seatType: SeatType,
  amount: number
}
