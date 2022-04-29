import { TicketPrice } from '@core/models/ticket-price/ticket-price';

export interface UpdateMovieSession {
  id: number,
  movieId: number,
  hallId: number,
  showTime: string,
  showDate: Date
  ticketPrices: TicketPrice[]
}
