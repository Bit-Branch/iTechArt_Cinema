import { TicketPrice } from '@core/models/ticket-price/ticket-price';

export interface CreateMovieSession {
  movieId: number,
  hallId: number,
  showTime: string,
  showDate: Date
  ticketPrices: TicketPrice[]
}
