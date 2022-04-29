import { TicketPrice } from '@core/models/ticket-price/ticket-price';

export interface DisplayMovieSession {
  id: number,
  movieId: number,
  hallId: number,
  showTime: string,
  movieName: string,
  cinemaName: string,
  hallName: string,
  showDate: Date
  ticketPrices: TicketPrice[]
}
