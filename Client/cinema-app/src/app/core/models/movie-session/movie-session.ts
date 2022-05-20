import { TicketPrice } from '@core/models/ticket-price/ticket-price';

export interface MovieSession {
  id: number,
  movieId: number,
  hallId: number,
  startShowingTime: Date,
  endShowingTime: Date,
  ticketPrices: TicketPrice[]
}
