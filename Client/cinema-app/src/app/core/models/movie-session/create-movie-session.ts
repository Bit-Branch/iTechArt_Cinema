import { CreateTicketPrice } from '@core/models/ticket-price/create-ticket-price';

export interface CreateMovieSession {
  movieId: number,
  hallId: number,
  showTime: string,
  showDate: Date
  ticketPrices: CreateTicketPrice[]
}
