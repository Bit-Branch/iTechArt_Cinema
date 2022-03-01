import { SeatType } from '@core/models/seat-type/seat-type';

export interface TicketPrice {
  seatType: SeatType,
  price: number
}
